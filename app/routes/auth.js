import express from 'express';
import { makeAuth } from '../services/auth'

const router = express.Router();

router.route('/')
	.post(async (req, res) => {
		const data = await makeAuth(req.body)
		if (!data) {
			res.sendStatus(401)
			return false
		}
		res.json(data);
	})

export default router;