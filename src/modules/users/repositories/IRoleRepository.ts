import { Permission } from '../entities/Permission';
import { Role } from '../entities/Role';
import { IRoleRequest } from '../useCases/Dtos/Request/IRoleRequest';

export type IRoleRequestRepo = Omit<IRoleRequest, 'permissions'> & {
  permissions: Permission[];
};

interface IRoleRepository {
  create({
    name,
    id,
    description,
    permissions,
  }: IRoleRequestRepo): Promise<Role>;
  findByName(name: string): Promise<Role | null>;
  findByIds(ids: string[]): Promise<Role[]>;
  findById(id: string): Promise<Role | null>;
}

export { IRoleRepository };
