import { hash } from 'bcryptjs';
import { mock, MockProxy } from 'jest-mock-extended';
import { decode } from 'jsonwebtoken';

import AppError from '@errors/AppError';

import { ISendMail } from '../../../provider/email/ISendMail';
import { IEmployerRepository } from '../repositories/IEmployerRepository';
import { EmployerRepositoryInMemory } from '../repositories/in-memory/EmployerRepositoryInMemory';
import { ForgotPasswordUseCase } from '../useCases/ForgetPassword/ForgotPasswordUseCase';

let employerRepository: IEmployerRepository;
let forgetPasswordUseCase: ForgotPasswordUseCase;
let sendEmail: MockProxy<ISendMail>;

interface IJwtTest {
  subject: string;
}

describe('Esqueceu a senha', () => {
  beforeEach(() => {
    employerRepository = new EmployerRepositoryInMemory();
    sendEmail = mock();

    forgetPasswordUseCase = new ForgotPasswordUseCase(
      employerRepository,
      sendEmail
    );
  });

  test('Deveria enviar um token de redefinição de senha', async () => {
    const { email, id } = await employerRepository.create({
      cpf: 'xxx.xxx.xxx-xx',
      email: 'teste@gmail.com',
      name: 'teste',
      roles: [],
      password: await hash('teste', 8),
      hashToken: '12345',
    });

    const token = await forgetPasswordUseCase.execute(email);
    const { subject } = decode(token) as IJwtTest;

    expect(token).not.toBeNull();
    expect(subject).toEqual(id);
  });
  test('Deveria ocorrer um erro ao não encontrar o usuario', async () => {
    await expect(async () => {
      await forgetPasswordUseCase.execute('relaie22@gmail.com');
    }).rejects.toBeInstanceOf(AppError);
  });
});
