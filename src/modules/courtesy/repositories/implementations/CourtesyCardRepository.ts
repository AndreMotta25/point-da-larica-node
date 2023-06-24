import database from 'src/database';
import { Repository } from 'typeorm';

import { CourtesyCard } from '@modules/courtesy/entities/CourtesyCard';

import {
  ICourtesyCardRepository,
  ICourtesyCardRequest,
} from '../ICourtesyCardRepository';

class CourtesyCardRepository implements ICourtesyCardRepository {
  private repository: Repository<CourtesyCard>;
  constructor() {
    this.repository = database.getRepository(CourtesyCard);
  }
  async getCourtesyCardByCode(code: string): Promise<CourtesyCard | null> {
    const courtesy = await this.repository.findOne({ where: { code } });
    return courtesy;
  }

  async create(data: ICourtesyCardRequest): Promise<CourtesyCard> {
    const cortesyCard = this.repository.create(data);
    await this.repository.save(cortesyCard);

    return cortesyCard;
  }
}
export { CourtesyCardRepository };
