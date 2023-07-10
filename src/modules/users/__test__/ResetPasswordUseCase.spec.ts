import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { v4 } from 'uuid';

import AppError from '@errors/AppError';

import { Employer } from '../entities/Employer';
import { IEmployerRepository } from '../repositories/IEmployerRepository';
import { EmployerRepositoryInMemory } from '../repositories/in-memory/EmployerRepositoryInMemory';
import { ResetPasswordUseCase } from '../useCases/ResetPassword/ResetPasswordUseCase';

let employerRepository: IEmployerRepository;
let resetPasswordUseCase: ResetPasswordUseCase;

describe('Reset Password', () => {
  beforeEach(() => {
    employerRepository = new EmployerRepositoryInMemory();
    resetPasswordUseCase = new ResetPasswordUseCase(employerRepository);
  });

  test('Deveria resetar a senha', async () => {
    const { id, hashToken } = await employerRepository.create({
      cpf: 'xxx.xxx.xxx-xx',
      email: 'teste@gmail.com',
      name: 'teste',
      roles: [],
      password: await hash('teste', 8),
      hashToken: '12345',
    });
    const token = sign(
      {
        subject: id,
      },
      hashToken
    );

    await resetPasswordUseCase.execute({
      token,
      new_password: 'desenhos1',
    });

    const employer = (await employerRepository.findById(id)) as Employer;

    expect(await compare('desenhos1', employer.password)).toBeTruthy();
  });
  test('Deveria ocorrer um erro ao não achar o usuario', async () => {
    await expect(async () => {
      const token = sign(
        {
          subject: v4(),
        },
        v4()
      );

      await resetPasswordUseCase.execute({
        token,
        new_password: 'desenhos1',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  test('Deveria ocorrer um erro ao verificar um token invalido', async () => {
    await expect(async () => {
      const { id } = await employerRepository.create({
        cpf: 'xxx.xxx.xxx-xx',
        email: 'teste@gmail.com',
        name: 'teste',
        roles: [],
        password: await hash('teste', 8),
        hashToken: '12345',
      });
      const token = sign(
        {
          subject: id,
        },
        '22222'
      );

      await resetPasswordUseCase.execute({
        token,
        new_password: 'desenhos1',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
