import { Request, Response } from 'express';
import { validator } from 'src/provider/resultValidator/implements/validator';
import { container } from 'tsyringe';

import { CreateEmployerUseCase } from './CreateEmployerUseCase';

class CreateEmployerController {
  async handle(request: Request, response: Response) {
    const result = validator(request);

    if (result.hasErrors())
      return response.status(400).json({ errors: result.getErrors() });

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
