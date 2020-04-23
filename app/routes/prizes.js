import express from 'express';
import Prize from '../models/prize';

const router = express.Router();

router.route('/')
	.get((req, res) => {
		Prize.find({}, (err, prizes) => {
			if(err)
				res.send(err)
			res.json(prizes);
		});
	})

export default router;