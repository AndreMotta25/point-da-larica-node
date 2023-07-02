import { inject, injectable } from 'tsyringe';

import AppError from '@errors/AppError';
import { ICourtesyCardRepository } from '@modules/courtesy/repositories/ICourtesyCardRepository';

@injectable()
class useCourtesyCardUseCase {
  constructor(
    @inject('CourtesyCardRepository')
    private courtesyCardRepository: ICourtesyCardRepository
  ) {}

  async execute(code: string) {
    const courtesyCard =
      await this.courtesyCardRepository.getCourtesyCardByCode(code);
    if (!courtesyCard)
      throw new AppError('O cliente não tem credito na loja!', 400);

    if (courtesyCard.expiresIn < new Date())
      throw new AppError(
        `A cortesia expirou em ${courtesyCard.expiresIn.toLocaleString()}`
      );

    if (courtesyCard.value <= 0)
      throw new AppError('Cartão cortesia sem saldo suficiente');

    return courtesyCard;
  }
}

export { useCourtesyCardUseCase };
