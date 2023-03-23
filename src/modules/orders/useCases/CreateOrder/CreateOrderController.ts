import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { container } from 'tsyringe';

import { CreateOrderUseCase } from './CreateOrderUseCase';

class CreateOrderController {
  async handler(request: Request, response: Response) {
    const errors = validationResult(request);

    if (!errors.isEmpty())
      return response.status(400).json({ errors: errors.array() });

    const { productList, coupon_code } = request.body;

    const createOrderService = container.resolve(CreateOrderUseCase);

    await createOrderService.execute({ productList, coupon_code });

    return response.status(201).send();
  }
}

export { CreateOrderController };
