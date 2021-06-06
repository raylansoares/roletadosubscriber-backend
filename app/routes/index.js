import authRoutes from './auth'
import configurationsRoutes from './configurations'
import express from 'express'
import prizeRoutes from './prizes'
import rewardsRoutes from './rewards'
import subscriberRoutes from './subscribers'
import userRoutes from './user'
import webhooksRoutes from './webhooks'

const router = express.Router()

router.use('/prizes', prizeRoutes)
router.use('/subscribers', subscriberRoutes)
router.use('/auth', authRoutes)
router.use('/users', userRoutes)
router.use('/webhooks', webhooksRoutes)
router.use('/configurations', configurationsRoutes)
router.use('/rewards', rewardsRoutes)

export default router
