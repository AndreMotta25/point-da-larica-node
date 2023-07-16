import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { container } from 'tsyringe';

import { RemoveRolesFromEmployerUseCase } from './RemoveRolesFromEmployerUseCase';

class RemoveRolesFromEmployerController {
  async handle(request: Request, response: Response) {
    const result = validationResult(request);

    if (!result.isEmpty()) {
      return response.json({ errors: result.array() });
    }

    const { id } = request.params;
    const { roles_ids } = request.body;

    const removeRolesUseCase = container.resolve(
      RemoveRolesFromEmployerUseCase
    );

    const employer = await removeRolesUseCase.execute({
      employer_id: id,
      roles_ids,
    });
    return response.status(200).json(employer);
  }
}

export { RemoveRolesFromEmployerController };
