import express from 'express';
import { 
	find as findSubscribers,
	create as createSubscriber,
	findOne as findOneSubscriber,
	updateOne as updateSubscriber,
	deleteOne as deleteSubscriber
} from '../services/subscribers'

const router = express.Router();

router.route('/')
	.get(async (req, res) => {
		const data = await findSubscribers()
		res.json(data);
	})

router.route('/')
	.post(async (req, res) => {
		const data = await createSubscriber(req.body)
		res.json(data);
	})

router.route('/:id')
	.get(async (req, res) => {
		const data = await findOneSubscriber(req.params.id)
		res.json(data);
	})

router.route('/:id')
	.patch(async (req, res) => {
		const data = await updateSubscriber(req.params.id, req.body)
		res.json(data);
	})

router.route('/:id')
	.delete(async (req, res) => {
		const data = await deleteSubscriber(req.params.id)
		res.json(data);
	})

export default router;