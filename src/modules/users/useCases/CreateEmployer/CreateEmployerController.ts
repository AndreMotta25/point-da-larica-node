import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { container } from 'tsyringe';

import { CreateEmployerUseCase } from './CreateEmployerUseCase';

class CreateEmployerController {
  async handle(request: Request, response: Response) {
    const result = validationResult(request);

    if (!result.isEmpty()) {
      return response.json({ errors: result.array() });
    }

    const { cpf, email, roles, name } = request.body;

    const createEmployerUseCase = container.resolve(CreateEmployerUseCase);
    const employer = await createEmployerUseCase.execute({
      cpf,
      email,
      roles,
      name,
    });
    return response.status(201).json(employer);
  }
}

export { CreateEmployerController };
