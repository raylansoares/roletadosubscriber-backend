import express from 'express';
import { find as findSubscriber } from '../services/subscribers'

const router = express.Router();

router.route('/')
	.get(async (req, res) => {
		const data = await findSubscriber()
		res.json(data);
	})

export default router;