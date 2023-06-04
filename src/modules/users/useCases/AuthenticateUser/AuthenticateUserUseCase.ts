import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import AppError from '@errors/AppError';
import { IEmployerRepository } from '@modules/users/repositories/IEmployerRepository';

interface IEmployerRequest {
  email: string;
  password: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('EmployerRepository')
    private employerRepository: IEmployerRepository
  ) {}

  async execute({ email, password }: IEmployerRequest) {
    const user = await this.employerRepository.findByEmail(email);
    if (!user) throw new AppError('Usuario ou Senha Incorretos', 401);

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) throw new AppError('Usuario ou Senha Incorretos', 401);

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
