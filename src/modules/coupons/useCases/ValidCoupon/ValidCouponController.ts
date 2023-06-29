import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ValidCouponUseCase from './ValidCouponUseCase';

class ValidCouponController {
  async handle(request: Request, response: Response) {
    const { code } = request.params;

    const service = container.resolve(ValidCouponUseCase);

    const cupom = await service.execute(code);

    return response.status(200).json(cupom);
  }
}

export default ValidCouponController;
