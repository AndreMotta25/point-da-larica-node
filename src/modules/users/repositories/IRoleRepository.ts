import { Permission } from '../entities/Permission';
import { Role } from '../entities/Role';

export interface IRoleRequestDTO {
  id?: string;
  name: string;
  description: string;
  permissions: Permission[];
}

interface IRoleRepository {
  create({
    name,
    id,
    description,
    permissions,
  }: IRoleRequestDTO): Promise<Role>;
  findByName(name: string): Promise<Role | null>;
  findByIds(ids: string[]): Promise<Role[]>;
}

export { IRoleRepository };
