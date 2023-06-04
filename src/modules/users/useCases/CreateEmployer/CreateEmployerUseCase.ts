import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';

import ErrorField from '@errors/ErrorField';
import { IEmployerRepository } from '@modules/users/repositories/IEmployerRepository';
import { IRoleRepository } from '@modules/users/repositories/IRoleRepository';

import { IEmployerRequestDTO } from './IEmployerRequestDTO';

@injectable()
class CreateEmployerUseCase {
  constructor(
    @inject('EmployerRepository')
    private employerRepository: IEmployerRepository,
    @inject('RoleRepository')
    private roleRepository: IRoleRepository
  ) {}

  async execute({ cpf, email, password, roles, name }: IEmployerRequestDTO) {
    const employerAlreadyExists = await this.employerRepository.findByEmail(
      email
    );
    if (employerAlreadyExists)
      throw new ErrorField(email, 'Email indisponivel', 'email', 400);

    const hashPass = await hash(password, 8);
    const hashToken = await hash(v4(), 8);

    const rolesExists = await this.roleRepository.findByIds(roles);

    const user = await this.employerRepository.create({
      email,
      name,
      cpf,
      password: hashPass,
      roles: rolesExists,
      hashToken,
    });

    return user;
  }
}

export { CreateEmployerUseCase };
