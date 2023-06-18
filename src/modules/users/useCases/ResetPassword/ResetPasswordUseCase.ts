import { hash } from 'bcryptjs';
import { decode, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';

import AppError from '@errors/AppError';
import { IEmployerRepository } from '@modules/users/repositories/IEmployerRepository';

import { IResetPasswordRequest } from '../Dtos/Request/IResetPasswordRequest';

interface IJwt {
  subject: string;
}

@injectable()
class ResetPasswordUseCase {
  constructor(
    @inject('EmployerRepository')
    private employerRepository: IEmployerRepository
  ) {}

  async execute({ token, new_password }: IResetPasswordRequest) {
    const { subject } = decode(token) as IJwt;

    const employer = await this.employerRepository.findById(subject);
    if (!employer) throw new AppError('Usuario não achado', 404);

    try {
      verify(token, employer.hashToken);
      console.log('qa');

      employer.password = await hash(new_password, 8);
      employer.hashToken = await hash(v4(), 8);

      await this.employerRepository.create(employer);
    } catch {
      throw new AppError('Token Inválido');
    }
  }
}

export { ResetPasswordUseCase };
