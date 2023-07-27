import { Request, Response } from 'express';
import { validator } from 'src/provider/resultValidator/implements/validator';
import { container } from 'tsyringe';

import { AssignRolesUseCase } from './AssignRolesUseCase';

class AssignRolesController {
  async handle(request: Request, response: Response) {
    const result = validator(request);

    if (result.hasErrors())
      return response.status(400).json({ errors: result.getErrors() });

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
