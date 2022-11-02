import express from 'express'
import { createWheelEvent } from '../services/webhooks'
import {
  updateOne as updateSubscription,
} from '../services/subscriptions'

const router = express.Router()

router.route('/callback')
  .post(async (req, res) => {
    if (req.body.challenge) {
      req.body.subscription.status = 'enabled'
      const data = await updateSubscription(
        req.body.subscription.id,
        req.body.subscription
      )
      if (!data) {
        res.sendStatus(500)
        return false
      }
      res.send(req.body.challenge)
      return
    }
    await createWheelEvent(req.body)
    res.status(200).send()
  })

export default router
