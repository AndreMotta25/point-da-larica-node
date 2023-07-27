import 'reflect-metadata';
import { Request, Response } from 'express';
import { validator } from 'src/provider/resultValidator/implements/validator';
import { container } from 'tsyringe';

import CreateCouponUseCase from './CreateCouponUseCase';

class CreateCouponController {
  async handler(request: Request, response: Response) {
    const result = validator(request);

    if (result.hasErrors())
      return response.status(400).json({ errors: result.getErrors() });

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
