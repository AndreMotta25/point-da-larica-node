import { inject, injectable } from 'tsyringe';

import AppError from '@errors/AppError';
import { IPermissionRepository } from '@modules/users/repositories/IPermissionRepository';
import { IRoleRepository } from '@modules/users/repositories/IRoleRepository';

import { IAssignPermitionsRequest } from '../Dtos/Request/IAssignPermitionsRequest';
import { IAssignPermitionsResponse } from '../Dtos/Response/IAssignPermitionsResponse';

@injectable()
class AssignPermitionsUseCase {
  constructor(
    @inject('RoleRepository') private roleRepository: IRoleRepository,
    @inject('PermissionRepository')
    private permissionRepository: IPermissionRepository
  ) {}

  async execute({
    role_id,
    permissions,
  }: IAssignPermitionsRequest): Promise<IAssignPermitionsResponse> {
    const role = await this.roleRepository.findById(role_id);

    if (!role) throw new AppError('Role não achada', 404);

    const permissionsExits = await this.permissionRepository.findByIds(
      permissions
    );
    const rolePermissions = role.permissions;
    console.log(rolePermissions);
    role.permissions = [...permissionsExits, ...rolePermissions];

    const roleSaved = await this.roleRepository.create(role);

    return {
      id: roleSaved.id,
      name: roleSaved.name,
      description: roleSaved.description,
      permissions: roleSaved.permissions.map((p) => p.name),
    };
  }
}

export { AssignPermitionsUseCase };
