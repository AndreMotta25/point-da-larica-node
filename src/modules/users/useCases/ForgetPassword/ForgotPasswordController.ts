import { Request, Response } from 'express';
import { validator } from 'src/provider/resultValidator/implements/validator';
import { container } from 'tsyringe';

import { ForgotPasswordUseCase } from './ForgotPasswordUseCase';

class ForgotPasswordController {
  async handle(request: Request, response: Response) {
    const result = validator(request);

    if (result.hasErrors())
      return response.status(400).json({ errors: result.getErrors() });

    const { email } = request.body;
    const forgetPasswordUseCase = container.resolve(ForgotPasswordUseCase);

    const token = await forgetPasswordUseCase.execute(email);
    return response.status(200).json({ msg: token });
  }
}

export { ForgotPasswordController };
