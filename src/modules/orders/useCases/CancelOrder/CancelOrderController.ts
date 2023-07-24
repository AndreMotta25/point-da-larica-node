import { NextFunction, Request, Response } from 'express';
import { validator } from 'src/provider/resultValidator/implements/validator';
import { container } from 'tsyringe';

import { CancelOrderUseCase } from './CancelOrderUseCase';

class CancelOrderController {
  async handle(request: Request, response: Response, next: NextFunction) {
    const result = validator(request);

    if (result.hasErrors())
      return response.status(400).json({ errors: result.getErrors() });

    const { id } = request.params;
    const cancelOrderUseCase = container.resolve(CancelOrderUseCase);

    const orderCanceled = await cancelOrderUseCase.execute(id);

    return next();
  }
}

export { CancelOrderController };
