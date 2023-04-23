import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { container } from 'tsyringe';

import { CreateOrderUseCase } from './CreateOrderUseCase';

class CreateOrderController {
  async handler(request: Request, response: Response) {
    const errors = validationResult(request);

    if (!errors.isEmpty())
      return response.status(400).json({ errors: errors.array() });

    const { itens, coupon_code, isDelivery, adress } = request.body;

    const createOrderService = container.resolve(CreateOrderUseCase);

    await createOrderService.execute({
      itens,
      coupon_code,
      isDelivery,
      adress,
    });

    return response.status(201).send();
  }
}

export { CreateOrderController };
