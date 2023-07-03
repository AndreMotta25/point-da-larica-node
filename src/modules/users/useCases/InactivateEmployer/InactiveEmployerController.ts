import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { InactivateEmployerUseCase } from './InactivateEmployerUseCase';

class InactiveEmployerController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const inactiveEmployer = container.resolve(InactivateEmployerUseCase);

    await inactiveEmployer.execute(id);

    return response.status(204).json();
  }
}

export { InactiveEmployerController };
