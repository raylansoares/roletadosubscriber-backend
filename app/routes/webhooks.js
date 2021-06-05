import express from 'express'
import { createWheelEvent } from '../services/webhooks'

const router = express.Router()

router.route('/callback')
  .post(async (req, res) => {
    if (req.body.challenge) {
      res.send(req.body.challenge)
      return
    }
    await createWheelEvent(req.body)
    res.status(200).send()
  })

export default router
