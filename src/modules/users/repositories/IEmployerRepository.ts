import { Employer } from '../entities/Employer';
import { Role } from '../entities/Role';
import { IEmployerRequest } from '../useCases/Dtos/Request/IEmployerRequest';

export type IRequest = Omit<IEmployerRequest, 'roles'> & {
  password: string;
  hashToken: string;
  roles: Role[];
};

interface IEmployerRepository {
  create(data: IRequest): Promise<Employer>;
  findByEmail(username: string): Promise<Employer | null>;
  findById(username: string): Promise<Employer | null>;
  findByCpf(cpf: string): Promise<Employer | null>;
}

export { IEmployerRepository };
