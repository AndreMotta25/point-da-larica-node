import { Request, Response, Router } from 'express';
import { hasPermission } from 'src/middleware/hasPermission';
import { isAuthenticated } from 'src/middleware/isAuthenticated';

import CreateCouponController from '../modules/coupons/useCases/CreateCoupon/CreateCouponController';
import InvalidCouponController from '../modules/coupons/useCases/InvalidCoupon/InvalidCouponController';
import ListCouponController from '../modules/coupons/useCases/ListCoupon/ListCouponController';
import ValidCouponController from '../modules/coupons/useCases/ValidCoupon/ValidCouponController';
import couponCreateValidade from '../modules/coupons/validations/couponCreate.validation';

const couponRoutes = Router();
const createController = new CreateCouponController();
const listController = new ListCouponController();
const validController = new ValidCouponController();
const invalidController = new InvalidCouponController();

couponRoutes.post(
  '/',
  couponCreateValidade,
  isAuthenticated,
  hasPermission('create_coupon'),
  createController.handler
);

couponRoutes.get(
  '/',
  isAuthenticated,
  hasPermission('get_coupon'),
  listController.handler
);

// Tenho que colocar o valor da compra aqui para validar também
couponRoutes.get(
  '/:code/isValid',
  isAuthenticated,
  hasPermission('get_coupon'),
  validController.handle
);

couponRoutes.put(
  '/:id/invalid',
  isAuthenticated,
  hasPermission('invalid_coupon'),
  invalidController.handle
);

export default couponRoutes;
