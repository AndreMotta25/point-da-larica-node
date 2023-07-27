import { Request, Response } from 'express';
import { validator } from 'src/provider/resultValidator/implements/validator';
import { container } from 'tsyringe';

import { CreateRoleUseCase } from './CreateRoleUseCase';

class CreateRoleController {
  async handle(request: Request, response: Response) {
    const result = validator(request);

    if (result.hasErrors())
      return response.status(400).json({ errors: result.getErrors() });
    const { name, description, permissions } = request.body;

    const createRoleUseCase = container.resolve(CreateRoleUseCase);

    const role = await createRoleUseCase.execute({
      name,
      description,
      permissions,
    });

    return response.status(200).json(role);
  }
}

export { CreateRoleController };
