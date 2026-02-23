import fs from 'fs';
import { chain } from 'stream-chain';
import { parser } from 'stream-json';
import { streamArray } from 'stream-json/streamers/StreamArray';
import { PrismaClient } from './generated/prisma'

const prisma = new PrismaClient();


// Define what the JSON object looks like
interface RawJsonObject {
	id: number;
	importantField: string;
	anotherField: string;
	junkData: string; // This is the stuff we want to skip
}

async function runImport() {
	const pipeline = chain([
		fs.createReadStream('large-file.json'),
		parser(),
		streamArray(),
	]);

	let batch: any[] = [];
	const BATCH_SIZE = 500; // Smaller batches are safer for SQLite

	console.log('Starting import...');

	pipeline.on('data', async (data: { value: RawJsonObject }) => {
		// Pick ONLY what you want for the Prisma Model
		const { importantField, anotherField } = data.value;

		batch.push({
			importantField,
			anotherField,
		});

		if (batch.length >= BATCH_SIZE) {
			pipeline.pause(); // Stop reading file while DB is writing

			try {
				await prisma.yourModel.createMany({
					data: batch,
					skipDuplicates: true,
				});
				console.log(`Inserted ${batch.length} records...`);
			} catch (err) {
				console.error('Batch insert failed:', err);
			}

			batch = [];
			pipeline.resume(); // Start reading again
		}
	});

	pipeline.on('end', async () => {
		if (batch.length > 0) {
			await prisma.yourModel.createMany({ data: batch });
		}
		console.log('✅ Import finished successfully.');
		await prisma.$disconnect();
	});

	pipeline.on('error', (err) => {
		console.error('Pipeline error:', err);
	});
}

runImport();
