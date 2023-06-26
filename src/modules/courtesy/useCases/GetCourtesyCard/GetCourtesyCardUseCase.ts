import { inject, injectable } from 'tsyringe';

import AppError from '@errors/AppError';
import { ICourtesyCardRepository } from '@modules/courtesy/repositories/ICourtesyCardRepository';

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

  async execute(code: string) {
    const courtesy = await this.courtesyCardRepository.getCourtesyCardByCode(
      code
    );
    if (!courtesy) throw new AppError('Catão cortesia não existe');
    console.log(courtesy.employer.roles);
    console.log(courtesy.employer);
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
