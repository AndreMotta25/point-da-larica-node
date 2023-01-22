import { Router } from 'express';

import database from '../database';
import couponRoutes from './coupon.routes';

database
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((e) => {
    console.error('Erro during data source initialization', e);
  });

const router = Router();

router.use('/coupon', couponRoutes);

export default router;
