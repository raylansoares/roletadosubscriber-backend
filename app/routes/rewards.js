import express from 'express';
import Reward from '../models/reward';

const router = express.Router();

router.route('/')
	.get((req, res) => {
		Reward.find({}, (err, rewards) => {
			if(err)
				res.send(err)
			res.json(rewards);
		});
	})

export default router;