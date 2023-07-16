import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { container } from 'tsyringe';

import { InactivateEmployerUseCase } from './InactivateEmployerUseCase';

class InactiveEmployerController {
  async handle(request: Request, response: Response) {
    const result = validationResult(request);

    if (!result.isEmpty()) {
      return response.json({ errors: result.array() });
    }

    const { id } = request.params;

    const inactiveEmployer = container.resolve(InactivateEmployerUseCase);

    await inactiveEmployer.execute(id);

    return response.status(204).json();
  }
}

export { InactiveEmployerController };
