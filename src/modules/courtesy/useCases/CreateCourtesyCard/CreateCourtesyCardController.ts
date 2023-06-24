import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCourtesyCardUseCase } from './CreateCourtesyCardUseCase';

class CreateCourtesyCardController {
  async handle(request: Request, response: Response) {
    const { value, cpf, motivation } = request.body;
    const { id } = request.user;

    const createCourtesyCardUseCase = container.resolve(
      CreateCourtesyCardUseCase
    );

    const courtesyCard = await createCourtesyCardUseCase.execute({
      cpf,
      value,
      employer_id: id,
      motivation,
    });
    return response.status(200).json(courtesyCard);
  }
}

export { CreateCourtesyCardController };
