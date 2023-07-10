import { hash } from 'bcryptjs';

import AppError from '@errors/AppError';

import { Employer } from '../entities/Employer';
import { IEmployerRepository } from '../repositories/IEmployerRepository';
import { EmployerRepositoryInMemory } from '../repositories/in-memory/EmployerRepositoryInMemory';
import { AuthenticateUserUseCase } from '../useCases/AuthenticateUser/AuthenticateUserUseCase';

let employerRepository: IEmployerRepository;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe('Autenticar um usuario', () => {
  beforeEach(() => {
    employerRepository = new EmployerRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(employerRepository);
  });

  test('Deveria autenticar um usuario', async () => {
    await employerRepository.create({
      cpf: 'xxx.xxx.xxx-xx',
      email: 'teste@gmail.com',
      name: 'teste',
      roles: [],
      password: await hash('teste', 8),
      hashToken: '12345',
    });

    const token = await authenticateUserUseCase.execute({
      email: 'teste@gmail.com',
      password: 'teste',
    });

    expect(token).toHaveProperty('token');
  });

  test('Deveria ocorrer um erro ao não achar o usuario', async () => {
    await expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'teste@teste.com',
        password: 'teste',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  test('Deveria ocorrer um erro pelas senhas não combinarem', async () => {
    await expect(async () => {
      await employerRepository.create({
        cpf: 'xxx.xxx.xxx-xx',
        email: 'teste@gmail.com',
        name: 'teste',
        roles: [],
        password: await hash('teste', 8),
        hashToken: '12345',
      });

      await authenticateUserUseCase.execute({
        email: 'teste@gmail.com',
        password: 'teste1',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  test('Deveria ocorrer um erro caso um usuario não ativo tente fazer login', async () => {
    await expect(async () => {
      const { id } = await employerRepository.create({
        cpf: 'xxx.xxx.xxx-xx',
        email: 'teste@gmail.com',
        name: 'teste',
        roles: [],
        password: await hash('teste', 8),
        hashToken: '12345',
      });

      const employer = (await employerRepository.findById(id)) as Employer;
      employer.situation = false;

      await employerRepository.create(employer);

      await authenticateUserUseCase.execute({
        email: 'teste@gmail.com',
        password: 'teste',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
