import { inject, injectable } from 'tsyringe';

import AppError from '@errors/AppError';
import { IEmployerRepository } from '@modules/users/repositories/IEmployerRepository';

@injectable()
class InactivateEmployerUseCase {
  constructor(
    @inject('EmployerRepository')
    private employerRepository: IEmployerRepository
  ) {}

  async execute(id: string) {
    const employer = await this.employerRepository.findById(id);

    if (!employer) {
      throw new AppError('Empregado não achado', 404);
    }
    employer.situation = false;
    await this.employerRepository.create(employer);
  }
}

export { InactivateEmployerUseCase };
