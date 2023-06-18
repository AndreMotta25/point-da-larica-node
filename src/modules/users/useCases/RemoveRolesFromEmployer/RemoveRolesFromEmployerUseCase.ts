import { inject, injectable } from 'tsyringe';

import AppError from '@errors/AppError';
import { IEmployerRepository } from '@modules/users/repositories/IEmployerRepository';

import { IRequestRemoveRolesFromEmployer } from '../Dtos/Request/IRequestRemoveRolesFromEmployer';
import { IEmployerResponse } from '../Dtos/Response/IEmployerResponse';

@injectable()
class RemoveRolesFromEmployerUseCase {
  constructor(
    @inject('EmployerRepository')
    private employerRepository: IEmployerRepository
  ) {}

  async execute({
    employer_id,
    roles_ids,
  }: IRequestRemoveRolesFromEmployer): Promise<IEmployerResponse> {
    const employer = await this.employerRepository.findById(employer_id);

    if (!employer) throw new AppError('Usuario não achado', 404);

    const { roles } = employer;
    const definedRoles = roles.filter((role) => !roles_ids.includes(role.id));

    employer.roles = definedRoles;
    const employerSaved = await this.employerRepository.create(employer);

    return {
      id: employerSaved.id,
      email: employerSaved.email,
      name: employerSaved.name,
      roles: employerSaved.roles.map((r) => r.name),
    };
  }
}

export { RemoveRolesFromEmployerUseCase };
