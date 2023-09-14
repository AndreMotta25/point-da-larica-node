import { Request, Response } from 'express';
import { validator } from 'src/provider/resultValidator/implements/validator';
import { container } from 'tsyringe';

import ValidCouponUseCase from './ValidCouponUseCase';

class ValidCouponController {
  async handle(request: Request, response: Response) {
    const result = validator(request);

    if (result.hasErrors())
      return response.status(400).json({ errors: result.getErrors() });

    const { code } = request.params;
    const { value } = request.query;

    const service = container.resolve(ValidCouponUseCase);

    const cupom = await service.execute({ code, value: Number(value) });

    return response.status(200).json(cupom);
  }
}

export default ValidCouponController;
