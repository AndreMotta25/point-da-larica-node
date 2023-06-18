import { inject, injectable } from 'tsyringe';

import AppError from '@errors/AppError';
import { IPermissionRepository } from '@modules/users/repositories/IPermissionRepository';
import { IRoleRepository } from '@modules/users/repositories/IRoleRepository';

import { IRoleRequest } from '../Dtos/Request/IRoleRequest';

@injectable()
class CreateRoleUseCase {
  constructor(
    @inject('RoleRepository') private roleRepository: IRoleRepository,
    @inject('PermissionRepository')
    private permissionRepository: IPermissionRepository
  ) {}

  async execute({ name, description, permissions }: IRoleRequest) {
    const roleExists = await this.roleRepository.findByName(name);

    if (roleExists) throw new AppError('Função já existe');

    const permissionsExists = await this.permissionRepository.findByIds(
      permissions
    );

    const role = await this.roleRepository.create({
      name,
      description,
      permissions: permissionsExists,
    });

    return role;
  }
}

export { CreateRoleUseCase };
