import express from 'express';
import { 
	find as findUsers,
	create as createUser,
	findOne as findOneUser,
	updateOne as updateUser,
	deleteOne as deleteUser
} from '../services/users'

const router = express.Router();

router.route('/')
	.get(async (req, res) => {
		const data = await findUsers(req.query)
		res.json(data);
	})

router.route('/')
	.post(async (req, res) => {
		const data = await createUser(req.body)
		res.json(data);
	})

router.route('/:id')
	.get(async (req, res) => {
		const data = await findOneUser(req.params.id)
		res.json(data);
	})

router.route('/:id')
	.patch(async (req, res) => {
		const data = await updateUser(req.params.id, req.body)
		res.json(data);
	})

router.route('/:id')
	.delete(async (req, res) => {
		const data = await deleteUser(req.params.id)
		res.json(data);
	})

export default router;