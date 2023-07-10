import { Role } from '@modules/users/entities/Role';

import { IRoleRepository, IRoleRequestRepo } from '../IRoleRepository';

class RoleRepositoryInMemory implements IRoleRepository {
  private repository: Role[];

  constructor() {
    this.repository = [];
  }
  async create({
    name,
    id,
    description,
    permissions,
  }: IRoleRequestRepo): Promise<Role> {
    let role: Role;
    if (id) {
      role = (await this.findById(id)) as Role;
      Object.assign(role, { name, description, permissions, id });
    } else {
      role = new Role();
      Object.assign(role, { name, description, permissions });
      this.repository.push(role);
    }
    return role;
  }
  async findByName(name: string): Promise<Role | null> {
    return this.repository.find((r) => r.name === name) || null;
  }

  async findByIds(ids: string[]): Promise<Role[]> {
    return this.repository.filter((r) => ids.includes(r.id));
  }
  async findById(id: string): Promise<Role | null> {
    return this.repository.find((r) => r.id === id) || null;
  }
  async findAll(): Promise<Role[]> {
    return this.repository;
  }
}
export { RoleRepositoryInMemory };
