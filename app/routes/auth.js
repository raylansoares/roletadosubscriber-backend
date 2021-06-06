import express from 'express'
import { makeAuth, refreshToken } from '../services/auth'

const router = express.Router()

router.route('/')
  .post(async (req, res) => {
    const data = await makeAuth(req.body)
    if (!data) {
      res.sendStatus(401)
      return false
    }
    res.json(data)
  })

router.route('/refresh')
  .get(async (req, res) => {
    const data = await refreshToken(
      req.headers['x-code'],
      req.headers['x-auth-token']
    )
    if (!data) {
      res.sendStatus(500)
      return false
    }
    res.json(data)
  })

export default router
