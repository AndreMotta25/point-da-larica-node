import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

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

  async execute({
    username,
    cpf,
    email,
    password,
    roles,
    name,
  }: IEmployerRequestDTO) {
    const usernameAlreadyExists = await this.employerRepository.findByUsername(
      username
    );
    if (usernameAlreadyExists)
      throw new ErrorField(username, 'Username já existe', 'username', 400);

    const hashPass = await hash(password, 8);

    const rolesExists = await this.roleRepository.findByIds(roles);

    const user = await this.employerRepository.create({
      username,
      email,
      name,
      cpf,
      password: hashPass,
      roles: rolesExists,
    });

    return user;
  }
}

export { CreateEmployerUseCase };
