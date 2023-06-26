import { inject, injectable } from 'tsyringe';

import { Employer } from '@modules/users/entities/Employer';
import { IEmployerRepository } from '@modules/users/repositories/IEmployerRepository';

import { IGetEmployerResponse } from '../Dtos/Response/IGetEmployerResponse';

@injectable()
class GetEmployerUseCase {
  constructor(
    @inject('EmployerRepository')
    private employerRepository: IEmployerRepository
  ) {}
  async execute(id: string): Promise<IGetEmployerResponse> {
    const employer = (await this.employerRepository.findById(id)) as Employer;

    return {
      id: employer.id,
      email: employer.email,
      name: employer.name,
    };
  }
}

export { GetEmployerUseCase };
