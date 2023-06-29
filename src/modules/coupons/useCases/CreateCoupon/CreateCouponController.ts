import 'reflect-metadata';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator/src/validation-result';
import { container } from 'tsyringe';

import CreateCouponUseCase from './CreateCouponUseCase';

class CreateCouponController {
  async handler(request: Request, response: Response) {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    const { value, amount, expire_at, minimumValue } = request.body;

    const service = container.resolve(CreateCouponUseCase);

    const code = await service.execute({
      value,
      amount,
      expire_at,
      minimumValue,
    });
    return response.status(201).json(code);
  }
}
export default CreateCouponController;
