import { inject, injectable } from 'tsyringe';

import AppError from '@errors/AppError';
import { IEmployerRepository } from '@modules/users/repositories/IEmployerRepository';
import { IRoleRepository } from '@modules/users/repositories/IRoleRepository';

import { IAssignRolesRequest } from '../Dtos/Request/IAssignRolesRequest';
import { IEmployerResponse } from '../Dtos/Response/IEmployerResponse';

@injectable()
class AssignRolesUseCase {
  constructor(
    @inject('RoleRepository') private roleRepository: IRoleRepository,
    @inject('EmployerRepository')
    private employerRepository: IEmployerRepository
  ) {}

  async execute({
    employer_id,
    roles,
  }: IAssignRolesRequest): Promise<IEmployerResponse> {
    const employer = await this.employerRepository.findById(employer_id);
    if (!employer) throw new AppError('Employer não encontrado.', 404);

    const rolesExists = await this.roleRepository.findByIds(roles);
    employer.roles = [...rolesExists, ...employer.roles];

    const employerWithRoles = await this.employerRepository.create(employer);
    return {
      id: employerWithRoles.id,
      email: employerWithRoles.email,
      name: employerWithRoles.name,
      roles: employerWithRoles.roles.map((r) => r.name),
    };
  }
}

export { AssignRolesUseCase };
