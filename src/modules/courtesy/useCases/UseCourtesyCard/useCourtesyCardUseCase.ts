import { inject, injectable } from 'tsyringe';

import AppError from '@errors/AppError';
import { ICourtesyCardRepository } from '@modules/courtesy/repositories/ICourtesyCardRepository';

export interface IUseCourtesyCardByCodeAndCpf {
  code: string;
  cpf_client: string;
}

@injectable()
class UseCourtesyCardUseCase {
  constructor(
    @inject('CourtesyCardRepository')
    private courtesyCardRepository: ICourtesyCardRepository
  ) {}

  async execute({ code, cpf_client }: IUseCourtesyCardByCodeAndCpf) {
    const courtesyCard =
      await this.courtesyCardRepository.getCourtesyCardByCodeAndCpf({
        code,
        cpf: cpf_client,
      });

    if (!courtesyCard)
      throw new AppError('O cliente não tem credito na loja!', 404);

    if (courtesyCard.expiresIn < new Date())
      throw new AppError(
        `A cortesia expirou em ${courtesyCard.expiresIn.toLocaleString()}`
      );

    if (courtesyCard.value <= 0)
      throw new AppError('Cartão cortesia sem saldo suficiente');

    return courtesyCard;
  }
}

export { UseCourtesyCardUseCase };
