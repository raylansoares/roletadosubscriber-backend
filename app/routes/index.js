import express from 'express';
import prizeRoutes from './prizes';
import subscriberRoutes from './subscribers';

const router = express.Router();

router.use('/prizes', prizeRoutes);
router.use('/subscribers', subscriberRoutes);

export default router;