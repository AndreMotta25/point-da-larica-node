import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { container } from 'tsyringe';

import { ForgotPasswordUseCase } from './ForgotPasswordUseCase';

class ForgotPasswordController {
  async handle(request: Request, response: Response) {
    const result = validationResult(request);

    if (!result.isEmpty()) {
      return response.json({ errors: result.array() });
    }

    const { email } = request.body;
    const forgetPasswordUseCase = container.resolve(ForgotPasswordUseCase);

    const token = await forgetPasswordUseCase.execute(email);
    return response.status(200).json({ msg: token });
  }
}

export { ForgotPasswordController };
