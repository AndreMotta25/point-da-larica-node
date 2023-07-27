import { Request, Response } from 'express';
import { validator } from 'src/provider/resultValidator/implements/validator';
import { container } from 'tsyringe';

import { RemoveRolesFromEmployerUseCase } from './RemoveRolesFromEmployerUseCase';

class RemoveRolesFromEmployerController {
  async handle(request: Request, response: Response) {
    const result = validator(request);

    if (result.hasErrors())
      return response.status(400).json({ errors: result.getErrors() });

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
