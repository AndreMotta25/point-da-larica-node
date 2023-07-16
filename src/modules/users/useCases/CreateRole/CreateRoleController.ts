import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { container } from 'tsyringe';

import { CreateRoleUseCase } from './CreateRoleUseCase';

class CreateRoleController {
  async handle(request: Request, response: Response) {
    const result = validationResult(request);

    if (!result.isEmpty()) {
      return response.json({ errors: result.array() });
    }

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
