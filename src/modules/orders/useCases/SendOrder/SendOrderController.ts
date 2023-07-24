import { Request, Response } from 'express';
import { validator } from 'src/provider/resultValidator/implements/validator';
import { container } from 'tsyringe';

import { SendOrderUseCase } from './SendOrderUseCase';

class SendOrderController {
  async handle(request: Request, response: Response) {
    // const errors = validationResult(request);
    const result = validator(request);

    if (result.hasErrors())
      return response.status(400).json({ errors: result.getErrors() });

    const { id } = request.params;

    const sendOrderUseCase = container.resolve(SendOrderUseCase);
    await sendOrderUseCase.execute(id);
    return response.status(204).send();
  }
}

export { SendOrderController };
