import { Request, Response } from 'express';
import { container } from 'tsyringe';

import InvalidCouponService from './InvalidCouponService';

class InvalidCouponController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const invalidCouponService = container.resolve(InvalidCouponService);

    await invalidCouponService.execute(id);

    return response.status(200).send();
  }
}

export default InvalidCouponController;
