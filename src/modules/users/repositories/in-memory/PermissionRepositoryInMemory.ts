import { Permission } from '@modules/users/entities/Permission';
import { IPermissionRequest } from '@modules/users/useCases/Dtos/Request/IPermissionRequest';

import { IPermissionRepository } from '../IPermissionRepository';

class PermissionRepositoryInMemory implements IPermissionRepository {
  private repository: Permission[];
  constructor() {
    this.repository = [];
  }

  async create({ name, description }: IPermissionRequest): Promise<Permission> {
    const permission = new Permission();

    Object.assign(permission, { name, description });

    this.repository.push(permission);

    return permission;
  }
  findByName(name: string): Promise<Permission | null> {
    throw new Error('Method not implemented.');
  }
  async findByIds(ids: string[]): Promise<Permission[]> {
    return this.repository.filter((p) => ids.includes(p.id));
  }
}
export { PermissionRepositoryInMemory };
