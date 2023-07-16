import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { container } from 'tsyringe';

import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const result = validationResult(request);
    if (!result.isEmpty()) return response.json({ errors: result.array() });

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
