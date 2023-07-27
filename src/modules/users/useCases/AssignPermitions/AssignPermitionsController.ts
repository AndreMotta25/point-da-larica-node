import { Request, Response } from 'express';
import { validator } from 'src/provider/resultValidator/implements/validator';
import { container } from 'tsyringe';

import { AssignPermitionsUseCase } from './AssignPermitionsUseCase';

class AssignPermitionsController {
  async handle(request: Request, response: Response) {
    const result = validator(request);

    if (result.hasErrors())
      return response.status(400).json({ errors: result.getErrors() });

    const { permissions_id } = request.body;
    const { id } = request.params;

    const assignUseCase = container.resolve(AssignPermitionsUseCase);

    const role_permittions = await assignUseCase.execute({
      role_id: id,
      permissions: permissions_id,
    });

    return response.status(200).json(role_permittions);
  }
}

export { AssignPermitionsController };
