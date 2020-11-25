import express from 'express';
import prizeRoutes from './prizes';
import subscriberRoutes from './subscribers';
import authRoutes from './auth';
import userRoutes from './user';
import webhooksRoutes from './webhooks';

const router = express.Router();

router.use('/prizes', prizeRoutes);
router.use('/subscribers', subscriberRoutes);
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/webhooks', webhooksRoutes);

export default router;