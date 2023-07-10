import { Employer } from '@modules/users/entities/Employer';

import { IEmployerRepository, IRequest } from '../IEmployerRepository';

class EmployerRepositoryInMemory implements IEmployerRepository {
  private repository: Employer[];

  constructor() {
    this.repository = [];
  }

  async create(data: IRequest): Promise<Employer> {
    let employer: Employer;
    if (data.id) {
      employer = (await this.findById(data.id)) as Employer;
      Object.assign(employer, { ...data });
    } else {
      employer = new Employer();
      Object.assign(employer, { ...data });
      this.repository.push(employer);
    }
    return employer;
  }
  async findByEmail(user_email: string): Promise<Employer | null> {
    return this.repository.find(({ email }) => email === user_email) || null;
  }
  async findById(user_id: string): Promise<Employer | null> {
    return this.repository.find(({ id }) => id === user_id) || null;
  }
  async findByCpf(user_cpf: string): Promise<Employer | null> {
    return this.repository.find(({ cpf }) => cpf === user_cpf) || null;
  }
}
export { EmployerRepositoryInMemory };
