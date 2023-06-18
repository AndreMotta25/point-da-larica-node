import { inject, injectable } from 'tsyringe';

import { IRoleRepository } from '@modules/users/repositories/IRoleRepository';

import { IRoleResponse } from '../Dtos/Response/IRoleResponse';

@injectable()
class GetRolesUseCase {
  constructor(
    @inject('RoleRepository') private roleRepository: IRoleRepository
  ) {}

  async execute(): Promise<IRoleResponse[]> {
    const roles = await this.roleRepository.findAll();

    return roles.map((r) => {
      const roleDTO: IRoleResponse = {
        id: r.id,
        name: r.name,
        description: r.description,
        permissions: r.permissions.map((p) => p.name),
      };
      return roleDTO;
    });
  }
}

export { GetRolesUseCase };
