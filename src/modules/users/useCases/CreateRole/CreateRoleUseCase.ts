import { inject, injectable } from 'tsyringe';

import AppError from '@errors/AppError';
import { IPermissionRepository } from '@modules/users/repositories/IPermissionRepository';
import { IRoleRepository } from '@modules/users/repositories/IRoleRepository';

import { IRoleRequest } from '../Dtos/Request/IRoleRequest';
import { IRoleCreateResponse } from '../Dtos/Response/IRoleCreateResponse';

@injectable()
class CreateRoleUseCase {
  constructor(
    @inject('RoleRepository') private roleRepository: IRoleRepository,
    @inject('PermissionRepository')
    private permissionRepository: IPermissionRepository
  ) {}

  async execute({
    name,
    description,
    permissions,
  }: IRoleRequest): Promise<IRoleCreateResponse> {
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

    return {
      id: role.id,
      name: role.name,
      description: role.description,
      permissions: role.permissions.map((p) => p.name),
    };
  }
}

export { CreateRoleUseCase };
