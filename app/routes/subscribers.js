import express from 'express';
import { 
	find as findSubscribers,
	create as createSubscriber,
	findOne as findOneSubscriber,
	updateOne as updateSubscriber,
	deleteOne as deleteSubscriber
} from '../services/subscribers'
import { checkAuth } from '../services/auth'

const router = express.Router();

router.use(async (req, res, next) => {
	const authorize = await checkAuth(req.headers)
	if (!authorize) {
		res.sendStatus(401)
		return false
	}
	next()
  })

router.route('/')
	.get(async (req, res) => {
		const data = await findSubscribers({ user_id: req.headers['x-user-id'] })
		res.json(data);
	})

router.route('/')
	.post(async (req, res) => {
		req.body.user_id = req.headers['x-user-id']
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