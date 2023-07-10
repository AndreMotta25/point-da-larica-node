import { RoleRepositoryInMemory } from '../repositories/in-memory/RoleRepositoryInMemory';
import { IRoleRepository } from '../repositories/IRoleRepository';
import { GetRolesUseCase } from '../useCases/GetRoles/GetRolesUseCase';

let roleRepository: IRoleRepository;
let getRolesUseCase: GetRolesUseCase;

describe('retornar roles', () => {
  beforeEach(() => {
    roleRepository = new RoleRepositoryInMemory();
    getRolesUseCase = new GetRolesUseCase(roleRepository);
  });
  test('Deveria retornar uma lista de roles', async () => {
    await roleRepository.create({
      name: 'Manager',
      description: 'Manager teste',
      permissions: [],
    });
    await roleRepository.create({
      name: 'Cashier',
      description: 'Cashier teste',
      permissions: [],
    });

    const roles = await getRolesUseCase.execute();
    expect(roles.length).toBe(2);
  });
});
