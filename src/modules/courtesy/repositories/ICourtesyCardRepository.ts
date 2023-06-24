import { Employer } from '@modules/users/entities/Employer';

import { ICreateCourtesyCardRequest } from '../dtos/Request/ICreateCourtesyCardRequest';
import { CourtesyCard } from '../entities/CourtesyCard';

export type ICourtesyCardRequest = Omit<
  ICreateCourtesyCardRequest,
  'employer_id'
> & {
  employer: Employer;
  expiresIn: Date;
  code: string;
};

interface ICourtesyCardRepository {
  create(data: ICourtesyCardRequest): Promise<CourtesyCard>;
  getCourtesyCardByCode(code: string): Promise<CourtesyCard | null>;
}

export { ICourtesyCardRepository };
