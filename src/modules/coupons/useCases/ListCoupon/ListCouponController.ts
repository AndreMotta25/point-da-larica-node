import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListCouponUseCase from './ListCouponUseCase';

class ListCouponController {
  async handler(request: Request, response: Response): Promise<Response> {
    const listCouponUseCase = container.resolve(ListCouponUseCase);

    const coupons = await listCouponUseCase.execute();

    return response.status(200).json(coupons);
  }
}
export default ListCouponController;
