import AppError from '@errors/AppError';

import { PermissionRepositoryInMemory } from '../repositories/in-memory/PermissionRepositoryInMemory';
import { RoleRepositoryInMemory } from '../repositories/in-memory/RoleRepositoryInMemory';
import { IPermissionRepository } from '../repositories/IPermissionRepository';
import { IRoleRepository } from '../repositories/IRoleRepository';
import { CreateRoleUseCase } from '../useCases/CreateRole/CreateRoleUseCase';

let roleRepository: IRoleRepository;
let permissionRepository: IPermissionRepository;
let createRoleUseCase: CreateRoleUseCase;

describe('Criar um papel', () => {
  beforeEach(() => {
    roleRepository = new RoleRepositoryInMemory();
    permissionRepository = new PermissionRepositoryInMemory();

    createRoleUseCase = new CreateRoleUseCase(
      roleRepository,
      permissionRepository
    );
  });

  test('Deveria criar uma role', async () => {
    const assign_role = await permissionRepository.create({
      name: 'assign_role',
      description: 'Assign a Role',
    });
    const create_permission = await permissionRepository.create({
      name: 'create_permission',
      description: 'Create a Permission',
    });

    const role = await createRoleUseCase.execute({
      name: 'Manager',
      description: 'Manager teste',
      permissions: [assign_role.id, create_permission.id],
    });

    expect(role).toHaveProperty('id');
  });
  test('Deveria ocorrer um erro se já existir uma role com o mesmo nome', async () => {
    await expect(async () => {
      const assign_role = await permissionRepository.create({
        name: 'assign_role',
        description: 'Assign a Role',
      });
      const create_permission = await permissionRepository.create({
        name: 'create_permission',
        description: 'Create a Permission',
      });

      await createRoleUseCase.execute({
        name: 'Manager',
        description: 'Manager teste',
        permissions: [assign_role.id, create_permission.id],
      });
      await createRoleUseCase.execute({
        name: 'Manager',
        description: 'Manager teste',
        permissions: [assign_role.id, create_permission.id],
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
