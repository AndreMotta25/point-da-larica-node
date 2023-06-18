import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GetRolesUseCase } from './GetRolesUseCase';

class GetRolesController {
  async handle(request: Request, response: Response) {
    const getRolesUseCase = container.resolve(GetRolesUseCase);
    const roles = await getRolesUseCase.execute();
    return response.status(200).json(roles);
  }
}

export { GetRolesController };
