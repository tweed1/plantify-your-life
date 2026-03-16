import express from 'express';
import { prisma } from './lib/prisma';
import cors from 'cors';
import type { Prisma } from './generated/prisma/client';

const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;

app.get('/', (req, res) => {
	res.send('goodbye World!');
});

app.get('/user/:id', async (req, res) => {
	const user = await prisma.user.findUnique({
		where: {
			id: Number(req.params.id),
		},
		include: {
			posts: true,
		},
	});
	return res.json(user);
});

// search all plants
app.get('/plants', async (req, res) => {
	try {
		// q is the search term
		const q = String(req.query.q ?? '');
		const page = Math.max(1, Number(req.query.page ?? 1));

		const limit = 10;
		const skip = (page - 1) * limit;

		let plants;
		let total;

		if (q) {
			const searchPattern = `%${q}%`;
			// Fetch the plants
			plants = await prisma.$queryRaw`
                SELECT * FROM "Plant"
                WHERE "common_name" LIKE ${searchPattern}
                    OR "scientific_name" LIKE ${searchPattern}
                ORDER BY "common_name" ASC
                LIMIT ${limit} OFFSET ${skip}
                `;

			// Fetch the count
			const totalResult = await prisma.$queryRaw`
                SELECT COUNT(*) as count FROM "Plant"
                WHERE "common_name" LIKE ${searchPattern}
                    OR "scientific_name" LIKE ${searchPattern}
                `;
			total = Number(totalResult[0].count);
		} else {
			plants = await prisma.plant.findMany({
				skip,
				take: limit,
				orderBy: { common_name: 'asc' },
			});
			total = await prisma.plant.count();
		}

		// format the response to look like a standard API response
		res.json({
			data: plants,
			total: total,
			current_page: page,
			last_page: Math.ceil(total / limit),
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Server error' });
	}
});

// get a plant's details
app.get('/plants/:id', async (req, res) => {
	const plant = await prisma.plant.findUnique({
		where: {
			id: Number(req.params.id),
		},
	});
	return res.json(plant);
});

app.put('/plants/:id', async (req, res) => {
	const body = req.body;
	console.dir(body);
	try {
		const updatedPlant = await prisma.plant.update({
			where: { id: Number(req.params.id) },
			data: {
				// 1. Basic Strings (Straightforward)
				common_name: body.common_name,
				cycle: body.cycle,
				description: body.description,
				family: body.family,
				flowering_season: body.flowering_season,
				genus: body.genus,
				hardiness_min: body.hardiness_min,
				hardiness_max: body.hardiness_max,
				harvest_season: body.harvest_season,
				plant_anatomy: body.plant_anatomy,
				scientific_name: body.scientific_name,
				type: body.type,
			},
		});

		res.json(updatedPlant);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to update plant' });
	}
});

app.delete('/plants/:id', async (req, res) => {
	const id = req.params.id;
    console.log(id);

	try {
		const deletedItem = await prisma.plant.delete({
			where: { id: Number(id) },
		});
		res.status(200).json(deletedItem);
	} catch (error) {
		res.status(404).json({ error: 'item not found or deletion failed' });
	}
});

app.post('/plants', async (req, res) => {
	const {
		common_name,
		cycle,
		description,
		family,
		flowering_season,
		genus,
		hardiness_min,
		hardiness_max,
		harvest_season,
		plant_anatomy,
		scientific_name,
		type,
	} = req.body;

	const newPlant = await prisma.plant.create({
		data: {
			common_name,
			cycle,
			description,
			family,
			flowering_season,
			genus,
			hardiness_min,
			hardiness_max,
			harvest_season,
			plant_anatomy,
			scientific_name,
			type,
		},
	});
	res.json(newPlant);
});

/* ********************* */
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
