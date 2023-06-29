import { Request, Response } from 'express';
import { container } from 'tsyringe';

import InvalidCouponUseCase from './InvalidCouponUseCase';

class InvalidCouponController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const invalidCouponUseCase = container.resolve(InvalidCouponUseCase);

    await invalidCouponUseCase.execute(id);

    return response.status(200).send();
  }
}

export default InvalidCouponController;
