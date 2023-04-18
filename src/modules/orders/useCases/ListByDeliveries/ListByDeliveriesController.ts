import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListByDeliveriesUseCase } from './ListByDeliveriesUseCase';

class ListByDeliveriesController {
  async handler(request: Request, response: Response) {
    const listByDeliveries = container.resolve(ListByDeliveriesUseCase);
    const { date } = request.query;

    const orders = await listByDeliveries.execute(date as string);

    return response.status(200).json(orders);
  }
}

export { ListByDeliveriesController };
