import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AdditionalPaymentUseCase } from './AdditionalPaymentUseCase';

class AdditionalPaymentController {
  async handle(request: Request, response: Response) {
    const { additionalPayment } = request.body;
    const { id } = request.params;

    const additionalPaymentUseCase = container.resolve(
      AdditionalPaymentUseCase
    );

    const payment = await additionalPaymentUseCase.execute({
      id,
      value: additionalPayment,
    });

    return response.status(200).json(payment);
  }
}

export { AdditionalPaymentController };
