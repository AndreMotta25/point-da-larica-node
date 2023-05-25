import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body;

    const authenticaUserUseCase = container.resolve(AuthenticateUserUseCase);

    const credentials = await authenticaUserUseCase.execute({
      username,
      password,
    });

    return response.status(200).json(credentials);
  }
}

export { AuthenticateUserController };
