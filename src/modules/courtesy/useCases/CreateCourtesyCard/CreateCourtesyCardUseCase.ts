import { inject, injectable } from 'tsyringe';

import AppError from '@errors/AppError';
import ICodeGenerator from '@modules/coupons/providers/interfaces/ICodeGenerator';
import { ICreateCourtesyCardRequest } from '@modules/courtesy/dtos/Request/ICreateCourtesyCardRequest';
import { ICourtesyCardRepository } from '@modules/courtesy/repositories/ICourtesyCardRepository';
import { IEmployerRepository } from '@modules/users/repositories/IEmployerRepository';

@injectable()
class CreateCourtesyCardUseCase {
  constructor(
    @inject('CourtesyCardRepository')
    private courtesyRepository: ICourtesyCardRepository,
    @inject('EmployerRepository')
    private employerRepository: IEmployerRepository,
    @inject('CodeGenerator') private codeGenerator: ICodeGenerator
  ) {}

  async execute(data: ICreateCourtesyCardRequest) {
    const DAYS_TO_EXPIRE = 20;

    const expire = new Date();
    expire.setDate(expire.getDate() + DAYS_TO_EXPIRE);

    const expireIn = new Date(`${expire.toISOString().split('T')[0]}T23:59:59`);

    const employer = await this.employerRepository.findById(data.employer_id);

    if (!employer) throw new AppError('Empregado não achado', 404);

    // Um empregado não vai poder gerar um cartão para ele mesmo.
    if (employer.cpf === data.cpf)
      throw new AppError('Um empregado não pode gerar um cartão para sí', 401);

    if (!data.motivation.length)
      throw new AppError('Explique o motivo da cortesia!', 400);

    const courtesyCard = await this.courtesyRepository.create({
      cpf: data.cpf,
      employer,
      expiresIn: expireIn,
      value: data.value,
      code: this.codeGenerator.generateCode(4),
      motivation: data.motivation,
    });

    return courtesyCard;
  }
}

export { CreateCourtesyCardUseCase };
