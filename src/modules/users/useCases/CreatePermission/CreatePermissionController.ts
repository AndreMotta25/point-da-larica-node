import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreatePermissionUseCase } from './CreatePermissionUseCase';

class CreatePermissionController {
  async handle(request: Request, response: Response) {
    const { name, description } = request.body;

    const permissionUseCase = container.resolve(CreatePermissionUseCase);

    const permission = await permissionUseCase.execute({ name, description });
    console.log(permission);
    return response.status(200).json(permission);
  }
}

export { CreatePermissionController };
