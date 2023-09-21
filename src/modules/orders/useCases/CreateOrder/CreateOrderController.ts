import { Request, Response } from 'express';
import { validator } from 'src/provider/resultValidator/implements/validator';
import { container } from 'tsyringe';

import { CreateOrderUseCase } from './CreateOrderUseCase';

class CreateOrderController {
  async handler(request: Request, response: Response) {
    const result = validator(request);
    const { user } = request;

    if (result.hasErrors())
      return response.status(400).json({ errors: result.getErrors() });

    const {
      itens,
      coupon_code,
      isDelivery,
      address,
      courtesy_code,
      cpf_client,
    } = request.body;

    const createOrderService = container.resolve(CreateOrderUseCase);

    const order = await createOrderService.execute({
      itens,
      coupon_code,
      isDelivery,
      address,
      isSchedule: false,
      courtesy_code,
      employer: user.id,
      cpf_client,
    });

    return response.status(201).json(order);
  }
}

export { CreateOrderController };
