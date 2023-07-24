import { Request, Response } from 'express';
import { validator } from 'src/provider/resultValidator/implements/validator';
import { container } from 'tsyringe';

import { GetAllOrderUseCase } from './GetAllOrderUseCase';

class GetAllOrderController {
  async handler(request: Request, response: Response) {
    const result = validator(request);

    if (result.hasErrors())
      return response.status(400).json({ errors: result.getErrors() });

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
