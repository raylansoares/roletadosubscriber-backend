import express from 'express';
import { 
	find as findPrizes,
	create as createPrize,
	findOne as findOnePrize,
	update as updatePrize,
} from '../services/prizes'

const router = express.Router();

router.route('/')
	.get(async (req, res) => {
		const data = await findPrizes()
		res.json(data);
	})

router.route('/')
	.post(async (req, res) => {
		const data = await createPrize(req.body)
		res.json(data);
	})

router.route('/:id')
	.get(async (req, res) => {
		const data = await findOnePrize(req.params.id)
		res.json(data);
	})

router.route('/:id')
	.patch(async (req, res) => {
		const data = await updatePrize(req.params.id, req.body)
		res.json(data);
	})

export default router;