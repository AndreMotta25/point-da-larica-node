import database from 'src/database';
import { Repository } from 'typeorm';

import { Employer } from '@modules/users/entities/Employer';

import { IEmployerRepository, IRequest } from '../IEmployerRepository';

class EmployerRepository implements IEmployerRepository {
  private repository: Repository<Employer>;

  constructor() {
    this.repository = database.getRepository(Employer);
  }
  async findByCpf(cpf: string): Promise<Employer | null> {
    const user = await this.repository.findOne({
      where: {
        cpf,
      },
      relations: { roles: true },
    });
    return user;
  }

  async create(data: IRequest): Promise<Employer> {
    const user = this.repository.create({ ...data });
    await this.repository.save(user);
    return user;
  }

  async findByEmail(email: string): Promise<Employer | null> {
    const user = await this.repository.findOne({
      where: {
        email,
      },
      relations: { roles: { permissions: true } },
    });
    return user;
  }
  async findById(id: string): Promise<Employer | null> {
    const user = await this.repository.findOne({
      where: {
        id,
      },
      relations: { roles: { permissions: true } },
    });
    return user;
  }
}
export { EmployerRepository };
