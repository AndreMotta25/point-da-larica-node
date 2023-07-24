import { Request, Response } from 'express';
import { validator } from 'src/emailProvider/resultValidator/implements/validator';
import { container } from 'tsyringe';

import { AdditionalPaymentUseCase } from './AdditionalPaymentUseCase';

class AdditionalPaymentController {
  async handle(request: Request, response: Response) {
    const result = validator(request);

    if (result.hasErrors())
      return response.status(400).json({ errors: result.getErrors() });

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
