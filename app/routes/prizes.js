import express from 'express';
import { find as findPrizes } from '../services/prizes'

const router = express.Router();

router.route('/')
	.get(async (req, res) => {
		const data = await findPrizes()
		res.json(data);
	})

export default router;