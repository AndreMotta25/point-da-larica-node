import { Permission } from '../entities/Permission';
import { IPermissionRequest } from '../useCases/Dtos/Request/IPermissionRequest';

interface IPermissionRepository {
  create({ name, id }: IPermissionRequest): Promise<Permission>;
  findByName(name: string): Promise<Permission | null>;
  findByIds(ids: string[]): Promise<Permission[]>;
}

export { IPermissionRepository };
