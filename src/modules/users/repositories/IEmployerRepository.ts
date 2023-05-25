import { Employer } from '../entities/Employer';
import { Role } from '../entities/Role';

export interface IEmployerRequestDTO {
  name: string;
  username: string;
  password: string;
  cpf: string;
  email: string;
  roles: Role[];
  id?: string;
}

interface IEmployerRepository {
  create(data: IEmployerRequestDTO): Promise<Employer>;
  findByUsername(username: string): Promise<Employer | null>;
  findById(username: string): Promise<Employer | null>;
}

export { IEmployerRepository };
