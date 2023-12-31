import { CourtesyCard } from '@modules/courtesy/entities/CourtesyCard';

import {
  ICourtesyCardRepository,
  ICourtesyCardRequest,
  IGetCourtesyCardByCodeAndCpf,
} from '../ICourtesyCardRepository';

class CourtesyCardRepositoryInMemory implements ICourtesyCardRepository {
  private courtesyCardRepository: CourtesyCard[];
  constructor() {
    this.courtesyCardRepository = [];
  }

  async create(data: ICourtesyCardRequest): Promise<CourtesyCard> {
    let courtesyCard: CourtesyCard;
    if (data.id) {
      courtesyCard = this.courtesyCardRepository.find(
        (card) => card.id === data.id
      ) as CourtesyCard;
    } else {
      courtesyCard = new CourtesyCard();
    }
    Object.assign(courtesyCard, { ...data });

    return courtesyCard;
  }
  async getCourtesyCardByCodeAndCpf({
    code,
    cpf,
  }: IGetCourtesyCardByCodeAndCpf): Promise<CourtesyCard | null> {
    return (
      this.courtesyCardRepository.find(
        (c) => c.code === code && c.cpf === cpf
      ) || null
    );
  }
}
export { CourtesyCardRepositoryInMemory };
