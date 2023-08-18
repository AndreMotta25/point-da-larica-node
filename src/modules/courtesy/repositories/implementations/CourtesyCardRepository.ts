import database from 'src/database';
import { IQueryRunner } from 'src/database/transactions/QueryRunner/IQueryRunner';
import { inject, injectable } from 'tsyringe';
import { Repository } from 'typeorm';

import { CourtesyCard } from '@modules/courtesy/entities/CourtesyCard';

import {
  ICourtesyCardRepository,
  ICourtesyCardRequest,
  IGetCourtesyCardByCodeAndCpf,
} from '../ICourtesyCardRepository';

@injectable()
class CourtesyCardRepository implements ICourtesyCardRepository {
  private repository: Repository<CourtesyCard>;

  constructor(@inject('QueryRunner') private runner: IQueryRunner) {
    this.repository = database.getRepository(CourtesyCard);
  }
  async getCourtesyCardByCodeAndCpf({
    code,
    cpf,
  }: IGetCourtesyCardByCodeAndCpf): Promise<CourtesyCard | null> {
    const courtesy = await this.repository.findOne({
      where: { code, cpf },
      relations: { employer: { roles: true } },
    });
    return courtesy;
  }

  async create(data: ICourtesyCardRequest): Promise<CourtesyCard> {
    const runnerRepository = this.runner.getRepository(CourtesyCard);

    const cortesyCard = runnerRepository.create(data);
    await runnerRepository.save(cortesyCard);

    return cortesyCard;
  }
}
export { CourtesyCardRepository };
