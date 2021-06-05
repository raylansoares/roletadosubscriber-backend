import express from 'express'
import { checkAuth } from '../services/auth'
import {
  find as findRewards,
  create as createReward,
  findOne as findOneReward,
  updateOne as updateReward,
  deleteOne as deleteReward
} from '../services/rewards'

const router = express.Router()

router.route('/')
  .get(async (req, res) => {
    const data = await findRewards({ code: req.headers['x-code'] })
    if (!data) {
      res.sendStatus(500)
      return false
    }
    res.json(data)
  })

router.use(async (req, res, next) => {
  const authorize = await checkAuth(req.headers)
  if (!authorize) {
    res.sendStatus(401)
    return false
  }
  next()
})

router.route('/')
  .post(async (req, res) => {
    req.body.code = req.headers['x-code']
    const data = await createReward(req.body)
    if (!data) {
      res.sendStatus(500)
      return false
    }
    res.json(data)
  })

router.route('/:id')
  .get(async (req, res) => {
    const data = await findOneReward(req.params.id)
    if (!data) {
      res.sendStatus(500)
      return false
    }
    res.json(data)
  })

router.route('/:id')
  .patch(async (req, res) => {
    const data = await updateReward(req.params.id, req.body)
    if (!data) {
      res.sendStatus(500)
      return false
    }
    res.json(data)
  })

router.route('/:id')
  .delete(async (req, res) => {
    const data = await deleteReward(req.params.id)
    if (!data) {
      res.sendStatus(500)
      return false
    }
    res.json(data)
  })

export default router
