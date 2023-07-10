import { hash } from 'bcryptjs';

import { IEmployerRepository } from '../repositories/IEmployerRepository';
import { EmployerRepositoryInMemory } from '../repositories/in-memory/EmployerRepositoryInMemory';
import { GetEmployerUseCase } from '../useCases/GetEmployer/GetEmployerUseCase';

let getEmployerUseCase: GetEmployerUseCase;
let employerRepository: IEmployerRepository;

describe('Retorna um empregado', () => {
  beforeEach(() => {
    employerRepository = new EmployerRepositoryInMemory();
    getEmployerUseCase = new GetEmployerUseCase(employerRepository);
  });
  test('Deveria retornar um empregado', async () => {
    const { id } = await employerRepository.create({
      cpf: 'xxx.xxx.xxx-xx',
      email: 'teste@gmail.com',
      name: 'teste',
      roles: [],
      password: await hash('teste', 8),
      hashToken: '12345',
    });

    const employer = await getEmployerUseCase.execute(id);
    expect(employer).toHaveProperty('id');
    expect(employer.id).toEqual(id);
  });
});
