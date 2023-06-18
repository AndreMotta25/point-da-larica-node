import { inject, injectable } from 'tsyringe';

import AppError from '@errors/AppError';
import { IPermissionRepository } from '@modules/users/repositories/IPermissionRepository';

import { IPermissionRequest } from '../Dtos/Request/IPermissionRequest';

@injectable()
class CreatePermissionUseCase {
  constructor(
    @inject('PermissionRepository')
    private permissionRepository: IPermissionRepository
  ) {}

  async execute({ name, description }: IPermissionRequest) {
    const permissionExist = await this.permissionRepository.findByName(name);

    if (permissionExist) throw new AppError('Permissão já existe', 400);

    const permission = await this.permissionRepository.create({
      name,
      description,
    });
    return permission;
  }
}

export { CreatePermissionUseCase };
