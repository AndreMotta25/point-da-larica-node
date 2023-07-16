import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { container } from 'tsyringe';

import { AssignRolesUseCase } from './AssignRolesUseCase';

class AssignRolesController {
  async handle(request: Request, response: Response) {
    const result = validationResult(request);

    if (!result.isEmpty()) {
      return response.json({ errors: result.array() });
    }

    const { id } = request.params;
    const { roles } = request.body;

    const assignRolesUseCase = container.resolve(AssignRolesUseCase);
    const employer = await assignRolesUseCase.execute({
      employer_id: id,
      roles,
    });

    return response.status(200).json(employer);
  }
}

export { AssignRolesController };
