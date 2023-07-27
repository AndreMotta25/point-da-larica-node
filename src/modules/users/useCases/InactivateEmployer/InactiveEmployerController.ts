import { Request, Response } from 'express';
import { validator } from 'src/provider/resultValidator/implements/validator';
import { container } from 'tsyringe';

import { InactivateEmployerUseCase } from './InactivateEmployerUseCase';

class InactiveEmployerController {
  async handle(request: Request, response: Response) {
    const result = validator(request);

    if (result.hasErrors())
      return response.status(400).json({ errors: result.getErrors() });
    const { id } = request.params;

    const inactiveEmployer = container.resolve(InactivateEmployerUseCase);

    await inactiveEmployer.execute(id);

    return response.status(204).json();
  }
}

export { InactiveEmployerController };
