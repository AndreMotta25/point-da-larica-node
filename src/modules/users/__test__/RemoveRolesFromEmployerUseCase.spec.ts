import { hash } from 'bcryptjs';
import { v4 } from 'uuid';

import AppError from '@errors/AppError';

import { Role } from '../entities/Role';
import { IEmployerRepository } from '../repositories/IEmployerRepository';
import { EmployerRepositoryInMemory } from '../repositories/in-memory/EmployerRepositoryInMemory';
import { RemoveRolesFromEmployerUseCase } from '../useCases/RemoveRolesFromEmployer/RemoveRolesFromEmployerUseCase';

let removeRolesFromEmployer: RemoveRolesFromEmployerUseCase;
let employerRepository: IEmployerRepository;

describe('Remove papeis do usuário', () => {
  beforeEach(() => {
    employerRepository = new EmployerRepositoryInMemory();
    removeRolesFromEmployer = new RemoveRolesFromEmployerUseCase(
      employerRepository
    );
  });
  test('Deveria remover papeis de um usuário', async () => {
    const hashEmployer = await hash(v4(), 8);
    const roleManager = new Role();
    const roleCashier = new Role();

    Object.assign(roleManager, {
      name: 'Manager',
      description: 'Manager Test',
    });

    Object.assign(roleCashier, {
      name: 'Cashier',
      description: 'Manager Cashier',
    });

    const { id } = await employerRepository.create({
      name: 'nome teste',
      cpf: 'xxx.xxx.xxx-xx',
      email: 'teste@gmail.com',
      password: 'senhaTeste',
      hashToken: hashEmployer,
      roles: [roleManager, roleCashier],
    });

    await removeRolesFromEmployer.execute({
      employer_id: id,
      roles_ids: [roleCashier.id],
    });

    const employer = await employerRepository.findById(id);

    expect(employer?.roles.length).toBe(1);
    expect(employer?.roles[0].id).toBe(roleManager.id);
  });
  test('Deveria Ocorrer um erro ao não achar um usuário', async () => {
    await expect(async () => {
      await removeRolesFromEmployer.execute({
        employer_id: v4(),
        roles_ids: [v4()],
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
