import { hash } from 'bcryptjs';
import { v4 } from 'uuid';

import AppError from '@errors/AppError';

import { IEmployerRepository } from '../repositories/IEmployerRepository';
import { EmployerRepositoryInMemory } from '../repositories/in-memory/EmployerRepositoryInMemory';
import { InactivateEmployerUseCase } from '../useCases/InactivateEmployer/InactivateEmployerUseCase';

let employerRepository: IEmployerRepository;
let inactiveEmployerUseCase: InactivateEmployerUseCase;

describe('inativa empregado', () => {
  beforeEach(() => {
    employerRepository = new EmployerRepositoryInMemory();
    inactiveEmployerUseCase = new InactivateEmployerUseCase(employerRepository);
  });

  test('Deveria inativar um empregado', async () => {
    const { id, hashToken } = await employerRepository.create({
      cpf: 'xxx.xxx.xxx-xx',
      email: 'teste@gmail.com',
      name: 'teste',
      roles: [],
      password: await hash('teste', 8),
      hashToken: '12345',
    });

    await inactiveEmployerUseCase.execute(id);

    const employer = await employerRepository.findById(id);

    expect(employer?.situation).toBeFalsy();
  });

  test('Deveria ocorrer um erro ao não achar um usuário', async () => {
    await expect(async () => {
      await inactiveEmployerUseCase.execute(v4());
    }).rejects.toBeInstanceOf(AppError);
  });
});
