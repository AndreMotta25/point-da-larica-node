import { Request, Response } from 'express';
import { validator } from 'src/provider/resultValidator/implements/validator';
import { container } from 'tsyringe';

import { GetOrderUseCase } from './GetOrderUseCase';

class GetOrderController {
  async handler(request: Request, response: Response) {
    const { id } = request.params;

    const result = validator(request);

    if (result.hasErrors())
      return response.status(400).json({ errors: result.getErrors() });

    const getOrderUseCase = container.resolve(GetOrderUseCase);
    const order = await getOrderUseCase.execute(id);

    return response.status(200).json(order);
  }
}

export { GetOrderController };
