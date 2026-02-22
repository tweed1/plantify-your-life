import express from 'express';
import { prisma } from './lib/prisma';
const app = express();
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

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
