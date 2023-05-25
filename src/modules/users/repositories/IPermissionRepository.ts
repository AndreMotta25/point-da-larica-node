import { Permission } from '../entities/Permission';
import { IPermissionRequestDTO } from '../useCases/CreatePermission/IPermissionRequestDTO';

interface IPermissionRepository {
  create({ name, id }: IPermissionRequestDTO): Promise<Permission>;
  findByName(name: string): Promise<Permission | null>;
  findByIds(ids: string[]): Promise<Permission[]>;
}

export { IPermissionRepository };
