import express from 'express';
import rewardRoutes from './rewards';

const router = express.Router();

router.use('/rewards', rewardRoutes);

export default router;