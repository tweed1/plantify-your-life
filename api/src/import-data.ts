import fs from 'fs';
import { chain } from 'stream-chain';
import type { PlantCreateManyInput } from './generated/prisma/models';
import parser from 'stream-chain/jsonl/parser.js';
import { prisma } from './lib/prisma';
import StreamArray from 'stream-json/streamers/StreamArray';
import { pick } from 'remeda';

async function runImport() {
	const pipeline = chain([
		fs.createReadStream('species_details_combined.json'),
		//parser(),
		StreamArray.withParser(),
	]);

	let batch: any[] = [];
	const BATCH_SIZE = 500; // Smaller batches are safer for SQLite

	console.log('Starting import...');

	pipeline.on('data', async (data: { value: PlantCreateManyInput }) => {
		// Pick ONLY what you want for the Prisma Model
		const trueData = pick(data.value, [
			'attracts',
			'care_level',
			'common_name',
			'cones',
			'cuisine',
			'cultivar',
			'cycle',
			'default_image',
			'description',
			'dimensions',
			'drought_tolerant',
			'edible_fruit',
			'edible_leaf',
			'family',
			'flowering_season',
			'flowers',
			'fruits',
			'genus',
			'growth_rate',
			'hardiness',
			'harvest_season',
			'hybrid',
			'indoor',
			'invasive',
			'leaf',
			'maintenance',
			'medicinal',
			'origin',
			'watering_general_benchmark',
			'watering',
			'variety',
			'type',
			'tropical',
			'thorny',
			'subspecies',
			'species_epithet',
            'salt_tolerant',
			'soil',
			'seeds',
			'scientific_name',
			'pruning_month',
			'propagation',
			'poisonous_to_pets',
			'poisonous_to_humans',
			'plant_anatomy',
			'pest_susceptibility',
			'other_name',
		]);

		batch.push(trueData);

		if (batch.length >= BATCH_SIZE) {
			pipeline.pause(); // Stop reading file while DB is writing

			try {
				await prisma.plant.createMany({
					data: batch,
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
			await prisma.plant.createMany({ data: batch });
		}
		console.log('Import finished successfully.');
		await prisma.$disconnect();
	});

	pipeline.on('error', (err) => {
		console.error('Pipeline error:', err);
	});
}

runImport();
