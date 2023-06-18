import { inject, injectable } from 'tsyringe';

import AppError from '@errors/AppError';
import { IEmployerRepository } from '@modules/users/repositories/IEmployerRepository';

import { IRequestRemoveRolesFromEmployer } from '../Dtos/Request/IRequestRemoveRolesFromEmployer';

@injectable()
class RemoveRolesFromEmployerUseCase {
  constructor(
    @inject('EmployerRepository')
    private employerRepository: IEmployerRepository
  ) {}

  async execute({ employer_id, roles_ids }: IRequestRemoveRolesFromEmployer) {
    const employer = await this.employerRepository.findById(employer_id);

    if (!employer) throw new AppError('Usuario não achado', 404);

    const { roles } = employer;
    const definedRoles = roles.filter((role) => !roles_ids.includes(role.id));

    employer.roles = definedRoles;
    const employerSaved = await this.employerRepository.create(employer);

    return employerSaved;
  }
}

export { RemoveRolesFromEmployerUseCase };
