import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListCouponService from './ListCouponService';

class ListCouponController {
  async handler(request: Request, response: Response): Promise<Response> {
    const listCouponService = container.resolve(ListCouponService);

    const coupons = await listCouponService.execute();

    return response.status(200).json(coupons);
  }
}
export default ListCouponController;
