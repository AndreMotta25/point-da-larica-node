import database from 'src/database';
import { Repository } from 'typeorm';

import { Employer } from '@modules/users/entities/Employer';

import {
  IEmployerRepository,
  IEmployerRequestDTO,
} from '../IEmployerRepository';

class EmployerRepository implements IEmployerRepository {
  private repository: Repository<Employer>;

  constructor() {
    this.repository = database.getRepository(Employer);
  }
  async create(data: IEmployerRequestDTO): Promise<Employer> {
    const user = this.repository.create({ ...data });
    await this.repository.save(user);
    return user;
  }

  async findByUsername(username: string): Promise<Employer | null> {
    const user = await this.repository.findOne({
      where: {
        username,
      },
      relations: { roles: true },
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
