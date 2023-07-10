import { v4 } from 'uuid';

import AppError from '@errors/AppError';

import { PermissionRepositoryInMemory } from '../repositories/in-memory/PermissionRepositoryInMemory';
import { RoleRepositoryInMemory } from '../repositories/in-memory/RoleRepositoryInMemory';
import { IPermissionRepository } from '../repositories/IPermissionRepository';
import { IRoleRepository } from '../repositories/IRoleRepository';
import { AssignPermitionsUseCase } from '../useCases/AssignPermitions/AssignPermitionsUseCase';

let roleRepository: IRoleRepository;
let permissionRepository: IPermissionRepository;
let assignPermitionsUseCase: AssignPermitionsUseCase;

describe('Atribuir Permissoes', () => {
  beforeEach(() => {
    roleRepository = new RoleRepositoryInMemory();
    permissionRepository = new PermissionRepositoryInMemory();
    assignPermitionsUseCase = new AssignPermitionsUseCase(
      roleRepository,
      permissionRepository
    );
  });

  test('Deveria atribuir uma permissão a uma role', async () => {
    const { id: permission_id } = await permissionRepository.create({
      name: 'insert_user',
      description: 'Insert a User',
    });

    const { id: role_id } = await roleRepository.create({
      name: 'role teste',
      description: 'An Role Of Test',
      permissions: [],
    });

    await assignPermitionsUseCase.execute({
      role_id,
      permissions: [permission_id],
    });

    const role = await roleRepository.findById(role_id);

    expect(role?.permissions.length).toBe(1);
    expect(role?.permissions[0].id).toEqual(permission_id);
  });
  test('Deveria ocorrer um erro ao não achar a role', async () => {
    await expect(async () => {
      const { id: permission_id } = await permissionRepository.create({
        name: 'insert_user',
        description: 'Insert a User',
      });

      await assignPermitionsUseCase.execute({
        role_id: v4(),
        permissions: [permission_id],
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
