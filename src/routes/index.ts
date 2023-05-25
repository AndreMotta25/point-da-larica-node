import { Router } from 'express';

import database from '../database';
import couponRoutes from './coupon.routes';
import { employerRoutes } from './employer.routes';
import { orderRoutes } from './order.routes';
import { permissionRoutes } from './permission.routes';
import { productRoutes } from './product.routes';
import { roleRoutes } from './role.routes';

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
router.use('/product', productRoutes);
router.use('/order', orderRoutes);
router.use('/role', roleRoutes);
router.use('/permission', permissionRoutes);
router.use('/user', employerRoutes);

export default router;
