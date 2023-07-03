import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import AppError from '@errors/AppError';
import { IEmployerRepository } from '@modules/users/repositories/IEmployerRepository';

import { IAuthenticateRequest } from '../Dtos/Request/IAuthenticateRequest';
import { IAuthenticateEmployerResponse } from '../Dtos/Response/IAuthenticateEmployerResponse';

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('EmployerRepository')
    private employerRepository: IEmployerRepository
  ) {}

  async execute({
    email,
    password,
  }: IAuthenticateRequest): Promise<IAuthenticateEmployerResponse> {
    const user = await this.employerRepository.findByEmail(email);
    if (!user) throw new AppError('Usuario ou Senha Incorretos', 401);

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) throw new AppError('Usuario ou Senha Incorretos', 401);

    if (!user.situation) throw new AppError('Usuario ou Senha Incorretos', 401);

    const token = sign(
      {
        subject: user.id,
        roles: user.roles.map((r) => r.name),
      },
      user.hashToken,
      {
        expiresIn: '1d',
      }
    );
    return {
      user: {
        id: user.id,
        email: user.email,
      },
      token,
    };
  }
}

export { AuthenticateUserUseCase };
