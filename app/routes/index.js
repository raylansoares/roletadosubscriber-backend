import express from 'express';
import prizeRoutes from './prizes';
import subscriberRoutes from './subscribers';
import authRoutes from './auth';

const router = express.Router();

router.use('/prizes', prizeRoutes);
router.use('/subscribers', subscriberRoutes);
router.use('/auth', authRoutes);

export default router;