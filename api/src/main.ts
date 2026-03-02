import express from 'express';
import { prisma } from './lib/prisma';
import cors from 'cors';
import type { Prisma } from './generated/prisma/client';

const app = express();
app.use(cors());
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

app.get('/plant-details/:id', async (req, res) => {
	const plant = await prisma.plant.findUnique({
		where: {
			id: Number(req.params.id),
		},
	});
	return res.json(plant);
});

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

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
