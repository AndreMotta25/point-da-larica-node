import { Request, Response, Router } from 'express';

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
  (request: Request, response: Response) => {
    createController.handler(request, response);
  }
);
couponRoutes.get('/', (request: Request, response: Response) => {
  listController.handler(request, response);
});
couponRoutes.get(
  '/:code/isValid',
  async (request: Request, response: Response) => {
    await validController.handle(request, response);
  }
);

couponRoutes.put('/:id/invalid', (request: Request, response: Response) => {
  invalidController.handle(request, response);
});

export default couponRoutes;
