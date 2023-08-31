import { inject, injectable } from 'tsyringe';

import AppError from '@errors/AppError';
import { ICourtesyCardRepository } from '@modules/courtesy/repositories/ICourtesyCardRepository';

import { IUseCourtesyCardByCodeAndCpf } from '../UseCourtesyCard/UseCourtesyCardUseCase';

interface ICourtesyResponse {
  id: string;
  code: string;
  motivation: string;
  expireIn: Date;
  value: number;
  employer: {
    id: string;
    role: string;
    name: string;
  };
}

@injectable()
class GetCourtesyCardUseCase {
  constructor(
    @inject('CourtesyCardRepository')
    private courtesyCardRepository: ICourtesyCardRepository
  ) {}

  async execute({ code, cpf_client }: IUseCourtesyCardByCodeAndCpf) {
    const courtesy =
      await this.courtesyCardRepository.getCourtesyCardByCodeAndCpf({
        code,
        cpf: cpf_client,
      });

    if (!courtesy) throw new AppError('Cartão cortesia não Achado');

    const courtesyDTO: ICourtesyResponse = {
      id: courtesy?.id,
      code: courtesy?.code,
      value: courtesy.value,
      motivation: courtesy.motivation,
      expireIn: courtesy.expiresIn,
      employer: {
        id: courtesy.employer.id,
        name: courtesy.employer.name,
        role: courtesy.employer.roles.map((r) => r.name).join(','),
      },
    };
    return courtesyDTO;
  }
}

export { GetCourtesyCardUseCase };
