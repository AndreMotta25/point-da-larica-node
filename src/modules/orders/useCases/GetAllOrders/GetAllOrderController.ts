import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GetAllOrderUseCase } from './GetAllOrderUseCase';

class GetAllOrderController {
  async handler(request: Request, response: Response) {
    const { limit, page } = request.query;

    const getAllUseCase = container.resolve(GetAllOrderUseCase);

    const orders = await getAllUseCase.execute({
      limit: Number(limit),
      page: Number(page),
    });

    return response.status(200).json(orders);
  }
}

export { GetAllOrderController };
