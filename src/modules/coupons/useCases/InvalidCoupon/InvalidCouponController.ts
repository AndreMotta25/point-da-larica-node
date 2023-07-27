import { Request, Response } from 'express';
import { validator } from 'src/provider/resultValidator/implements/validator';
import { container } from 'tsyringe';

import InvalidCouponUseCase from './InvalidCouponUseCase';

class InvalidCouponController {
  async handle(request: Request, response: Response) {
    const result = validator(request);

    if (result.hasErrors())
      return response.status(400).json({ errors: result.getErrors() });

    const { id } = request.params;

    const invalidCouponUseCase = container.resolve(InvalidCouponUseCase);

    await invalidCouponUseCase.execute(id);

    return response.status(204).send();
  }
}

export default InvalidCouponController;
