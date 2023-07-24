import { Request, Response } from 'express';
import { validator } from 'src/emailProvider/resultValidator/implements/validator';
import { container } from 'tsyringe';

import { CreateOrderUseCase } from './CreateOrderUseCase';

class CreateOrderController {
  async handler(request: Request, response: Response) {
    const result = validator(request);

    if (result.hasErrors())
      return response.status(400).json({ errors: result.getErrors() });

    const { itens, coupon_code, isDelivery, address, courtesy_code } =
      request.body;

    const createOrderService = container.resolve(CreateOrderUseCase);

    const order = await createOrderService.execute({
      itens,
      coupon_code,
      isDelivery,
      adress: address,
      isSchedule: false,
      courtesy_code,
    });

    return response.status(201).json(order);
  }
}

export { CreateOrderController };
