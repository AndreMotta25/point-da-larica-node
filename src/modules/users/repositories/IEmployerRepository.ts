import { Employer } from '../entities/Employer';
import { Role } from '../entities/Role';

export interface IEmployerRequestDTO {
  name: string;
  password: string;
  hashToken: string;
  cpf: string;
  email: string;
  roles: Role[];
  id?: string;
}

interface IEmployerRepository {
  create(data: IEmployerRequestDTO): Promise<Employer>;
  findByEmail(username: string): Promise<Employer | null>;
  findById(username: string): Promise<Employer | null>;
  findByCpf(cpf: string): Promise<Employer | null>;
}

export { IEmployerRepository };
