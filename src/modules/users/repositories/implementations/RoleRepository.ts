import database from 'src/database';
import { In, Repository } from 'typeorm';

import { Role } from '@modules/users/entities/Role';

import { IRoleRepository, IRoleRequestDTO } from '../IRoleRepository';

class RoleRepository implements IRoleRepository {
  private repository: Repository<Role>;

  constructor() {
    this.repository = database.getRepository(Role);
  }
  async findByIds(ids: string[]): Promise<Role[]> {
    const roles = await this.repository.find({ where: { id: In(ids) } });
    return roles;
  }
  async findByName(name: string): Promise<Role | null> {
    const role = await this.repository.findOne({ where: { name } });
    return role;
  }

  async create({
    name,
    description,
    permissions,
    id,
  }: IRoleRequestDTO): Promise<Role> {
    const role = this.repository.create({ name, description, permissions, id });

    await this.repository.save(role);

    return role;
  }
}
export { RoleRepository };
