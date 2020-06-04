import express from 'express';
import { 
	find as findUsers,
} from '../services/users'

const router = express.Router();

router.use(async (req, res, next) => {
	if (!req.headers['x-client-secret'] || req.headers['x-client-secret'] !== process.env.CLIENT_SECRET) {
		res.sendStatus(401)
		return false
	}
	next()
  })

router.route('/')
	.get(async (req, res) => {
		const data = await findUsers(req.query)
		res.json(data);
	})

export default router;