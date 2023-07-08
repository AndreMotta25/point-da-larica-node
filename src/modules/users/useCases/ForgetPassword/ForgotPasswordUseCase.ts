import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import AppError from '@errors/AppError';
import { IEmployerRepository } from '@modules/users/repositories/IEmployerRepository';

import { ISendMail } from '../../../../emailProvider/ISendMail';
import { convertTime } from '../../../../utils/convertTime';

@injectable()
class ForgotPasswordUseCase {
  constructor(
    @inject('EmployerRepository')
    private employerRepository: IEmployerRepository,
    @inject('SendMail')
    private SendMail: ISendMail
  ) {}

  async execute(email: string) {
    const employer = await this.employerRepository.findByEmail(email);

    if (!employer) throw new AppError('Usuario não achado', 404);

    const token = sign({ subject: employer.id }, employer.hashToken, {
      expiresIn: convertTime.toHour(1),
    });

    this.SendMail.sendEmail({
      to: employer.email,
      template: 'forgetPassword',
      subject: 'Reset Password',
      context: {
        name: employer.name,
        token,
      },
    });

    return token;
  }
}

export { ForgotPasswordUseCase };
