import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateEmployerUseCase } from './CreateEmployerUseCase';

class CreateEmployerController {
  async handle(request: Request, response: Response) {
    const { username, cpf, email, password, roles, name } = request.body;

    const createEmployerUseCase = container.resolve(CreateEmployerUseCase);
    const employer = await createEmployerUseCase.execute({
      username,
      cpf,
      email,
      password,
      roles,
      name,
    });
    return response.status(201).json(employer);
  }
}

export { CreateEmployerController };
