import { Request, Response } from 'express';
import { validator } from 'src/provider/resultValidator/implements/validator';
import { container } from 'tsyringe';

import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const result = validator(request);

    if (result.hasErrors())
      return response.status(400).json({ errors: result.getErrors() });

    const { email, password } = request.body;

    const authenticaUserUseCase = container.resolve(AuthenticateUserUseCase);

    const credentials = await authenticaUserUseCase.execute({
      email,
      password,
    });

    return response.status(200).json(credentials);
  }
}

export { AuthenticateUserController };
