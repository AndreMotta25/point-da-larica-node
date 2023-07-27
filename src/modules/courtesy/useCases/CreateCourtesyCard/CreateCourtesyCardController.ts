import { Request, Response } from 'express';
import { validator } from 'src/provider/resultValidator/implements/validator';
import { container } from 'tsyringe';

import { CreateCourtesyCardUseCase } from './CreateCourtesyCardUseCase';

class CreateCourtesyCardController {
  async handle(request: Request, response: Response) {
    const result = validator(request);

    if (result.hasErrors())
      return response.status(400).json({ errors: result.getErrors() });

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
    return response.status(201).json(courtesyCard);
  }
}

export { CreateCourtesyCardController };
