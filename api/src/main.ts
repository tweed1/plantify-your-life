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
        // 1. Get params to match Perenual: 'q' for search, 'page' for page
        const q = String(req.query.q ?? '');
        const page = Math.max(1, Number(req.query.page ?? 1));

        const limit = 10;
        const skip = (page - 1) * limit;

        let plants;
        let total;

        if (q) {
            const searchPattern = `%${q}%`;
            // Raw query for case-insensitivity
            plants = await prisma.$queryRaw`
                SELECT * FROM "Plant" 
                WHERE "common_name" LIKE ${searchPattern} COLLATE NOCASE
                   OR "scientific_name" LIKE ${searchPattern} COLLATE NOCASE
                ORDER BY "common_name" ASC
                LIMIT ${limit} OFFSET ${skip}
            `;

            const countResult = await prisma.$queryRaw`
                SELECT COUNT(*) as count FROM "Plant"
                WHERE "common_name" LIKE ${searchPattern} COLLATE NOCASE
                   OR "scientific_name" LIKE ${searchPattern} COLLATE NOCASE
            `;
            total = Number(countResult[0].count);
        } else {
            plants = await prisma.plant.findMany({
                skip,
                take: limit,
                orderBy: { common_name: 'asc' },
            });
            total = await prisma.plant.count();
        }

        // 2. Format the response to look like a standard API response
        res.json({
            data: plants,           // Perenual uses 'data' for the array
            total: total,
            current_page: page,
            last_page: Math.ceil(total / limit),
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});
/* app.get('/plants', async (req, res) => {
	try {
		const search = String(req.query.search ?? '');
		const page = Number(req.query.page ?? 1);

		const limit = 10; // results per page
		const currentPage = Number(page);
		const skip = (currentPage - 1) * limit;
        

		const plants = await prisma.plant.findMany({
			where: {
                OR: [
                    {common_name: {contains: search}},
                    {scientific_name: {contains: search}},
                ],
            },
			skip,
			take: limit,
			orderBy: {
				common_name: 'asc',
			},
		});

		const total = await prisma.plant.count({
			where: whereClause,
		});

		const lastPage = Math.ceil(total / limit);

		res.json({
			results: plants,
			currentPage,
			lastPage,
			totalResults: total,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Server error' });
	}
}); */

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
