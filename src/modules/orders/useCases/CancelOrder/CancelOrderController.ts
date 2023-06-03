import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CancelOrderUseCase } from './CancelOrderUseCase';

class CancelOrderController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const cancelOrderUseCase = container.resolve(CancelOrderUseCase);

    const orderCanceled = await cancelOrderUseCase.execute(id);
    return response.status(200).json(orderCanceled);
  }
}

export { CancelOrderController };
// total discount
