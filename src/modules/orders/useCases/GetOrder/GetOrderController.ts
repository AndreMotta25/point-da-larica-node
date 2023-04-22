import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GetOrderUseCase } from './GetOrderUseCase';

class GetOrderController {
  async handler(request: Request, response: Response) {
    const { id } = request.params;

    const getOrderUseCase = container.resolve(GetOrderUseCase);
    const order = await getOrderUseCase.execute(id);

    return response.status(200).json(order);
  }
}

export { GetOrderController };
