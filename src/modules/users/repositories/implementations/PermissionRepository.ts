import database from 'src/database';
import { In, Repository } from 'typeorm';

import { Permission } from '@modules/users/entities/Permission';
import { IPermissionRequestDTO } from '@modules/users/useCases/CreatePermission/IPermissionRequestDTO';

import { IPermissionRepository } from '../IPermissionRepository';

class PermissionRepository implements IPermissionRepository {
  private repository: Repository<Permission>;

  constructor() {
    this.repository = database.getRepository(Permission);
  }
  async create({
    name,
    id,
    description,
  }: IPermissionRequestDTO): Promise<Permission> {
    const permission = this.repository.create({ name, description, id });
    await this.repository.save(permission);

    return permission;
  }

  async findByName(name: string): Promise<Permission | null> {
    const permission = await this.repository.findOne({ where: { name } });
    return permission;
  }
  async findByIds(ids: string[]): Promise<Permission[]> {
    const permissions = await this.repository.find({ where: { id: In(ids) } });
    return permissions;
  }
}

export { PermissionRepository };
