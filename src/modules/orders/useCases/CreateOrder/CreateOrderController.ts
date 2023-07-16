import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { container } from 'tsyringe';

import { CreateOrderUseCase } from './CreateOrderUseCase';

class CreateOrderController {
  async handler(request: Request, response: Response) {
    const errors = validationResult(request);

    if (!errors.isEmpty())
      return response.status(400).json({ errors: errors.array() });

    const { itens, coupon_code, isDelivery, adress, courtesy_code } =
      request.body;

    const createOrderService = container.resolve(CreateOrderUseCase);

    const order = await createOrderService.execute({
      itens,
      coupon_code,
      isDelivery,
      adress,
      isSchedule: false,
      courtesy_code,
    });

    return response.status(201).json(order);
  }
}

export { CreateOrderController };
