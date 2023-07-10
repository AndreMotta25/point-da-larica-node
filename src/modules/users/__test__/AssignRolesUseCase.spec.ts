import { hash } from 'bcryptjs';
import { v4 } from 'uuid';

import AppError from '@errors/AppError';

import { Employer } from '../entities/Employer';
import { IEmployerRepository } from '../repositories/IEmployerRepository';
import { EmployerRepositoryInMemory } from '../repositories/in-memory/EmployerRepositoryInMemory';
import { RoleRepositoryInMemory } from '../repositories/in-memory/RoleRepositoryInMemory';
import { IRoleRepository } from '../repositories/IRoleRepository';
import { AssignRolesUseCase } from '../useCases/AssignRoles/AssignRolesUseCase';

let employerRepository: IEmployerRepository;
let roleRepository: IRoleRepository;
let assignRolesUseCase: AssignRolesUseCase;

describe('Atribuir Roles', () => {
  beforeEach(() => {
    employerRepository = new EmployerRepositoryInMemory();
    roleRepository = new RoleRepositoryInMemory();

    assignRolesUseCase = new AssignRolesUseCase(
      roleRepository,
      employerRepository
    );
  });

  test('Deveria atribuir roles a um usuario', async () => {
    // Vamos criar as roles primeiro
    const roleManager = await roleRepository.create({
      name: 'Manager',
      description: 'Manager test',
      permissions: [],
    });
    const roleCashier = await roleRepository.create({
      name: 'Cashier',
      description: 'Cashier test',
      permissions: [],
    });

    // vamos criar o usuario com uma só role
    const { id } = await employerRepository.create({
      cpf: 'xxx.xxx.xxx-xx',
      email: 'teste@gmail.com',
      name: 'teste',
      roles: [roleManager],
      password: await hash('teste', 8),
      hashToken: '12345',
    });

    await assignRolesUseCase.execute({
      employer_id: id,
      roles: [roleCashier.id],
    });

    const employer = (await employerRepository.findById(id)) as Employer;

    expect(employer.roles).toHaveLength(2);
    expect(employer.roles).toContain(roleCashier);
  });
  test('Deveria ocorrer um erro ao não achar o usuario', async () => {
    await expect(async () => {
      await assignRolesUseCase.execute({ employer_id: v4(), roles: [] });
    }).rejects.toBeInstanceOf(AppError);
  });
});
