import express from 'express';
import { find as findSubscribers } from '../services/subscribers'

const router = express.Router();

router.route('/')
	.get(async (req, res) => {
		const data = await findSubscribers()
		res.json(data);
	})

export default router;