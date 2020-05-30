import express from 'express';
import prizeRoutes from './prizes';
import subscriberRoutes from './subscribers';
import userRoutes from './users';
import authRoutes from './auth';

const router = express.Router();

router.use('/prizes', prizeRoutes);
router.use('/subscribers', subscriberRoutes);
router.use('/users', userRoutes);
router.use('/auth', authRoutes);

export default router;