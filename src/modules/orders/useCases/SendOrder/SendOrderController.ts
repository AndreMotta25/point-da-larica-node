import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { SendOrderUseCase } from './SendOrderUseCase';

class SendOrderController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    console.log(id);
    const sendOrderUseCase = container.resolve(SendOrderUseCase);
    await sendOrderUseCase.execute(id);
    return response.status(204).send();
  }
}

export { SendOrderController };
