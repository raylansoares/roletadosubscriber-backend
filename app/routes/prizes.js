import express from 'express';
import { 
	find as findPrizes,
	create as createPrize,
	findOne as findOnePrize,
	updateOne as updatePrize,
	deleteOne as deletePrize
} from '../services/prizes'
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
		const data = await findPrizes({ user_id: req.headers['x-user-id'] })
		res.json(data);
	})

router.route('/')
	.post(async (req, res) => {
		req.body.user_id = req.headers['x-user-id']
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

router.route('/:id')
	.delete(async (req, res) => {
		const data = await deletePrize(req.params.id)
		res.json(data);
	})

export default router;