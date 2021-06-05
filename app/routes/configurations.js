import express from 'express'
import { checkAuth } from '../services/auth'
import {
  find as findConfigurations,
  create as createConfiguration,
  updateOne as updateConfiguration
} from '../services/configurations'

const router = express.Router()

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
    const data = await findConfigurations({ code: req.headers['x-code'] })
    if (!data) {
      res.sendStatus(500)
      return false
    }
    res.json(data)
  })

router.route('/')
  .post(async (req, res) => {
    req.body.code = req.headers['x-code']
    const data = await createConfiguration(req.body)
    if (!data) {
      res.sendStatus(500)
      return false
    }
    res.json(data)
  })

router.route('/:id')
  .patch(async (req, res) => {
    const data = await updateConfiguration(req.params.id, req.body)
    if (!data) {
      res.sendStatus(500)
      return false
    }
    res.json(data)
  })

export default router
