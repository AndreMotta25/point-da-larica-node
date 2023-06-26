import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GetEmployerUseCase } from './GetEmployerUseCase';

class GetEmployerController {
  async handle(request: Request, response: Response) {
    const { id } = request.user;

    const getEmployerUseCase = container.resolve(GetEmployerUseCase);

    const employer = await getEmployerUseCase.execute(id);
    return response.status(200).json(employer);
  }
}

export { GetEmployerController };
