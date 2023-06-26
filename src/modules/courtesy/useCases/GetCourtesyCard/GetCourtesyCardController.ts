import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GetCourtesyCardUseCase } from './GetCourtesyCardUseCase';

class GetCourtesyCardController {
  async handle(request: Request, response: Response) {
    const { code } = request.params;

    const getCourtesyCardUseCase = container.resolve(GetCourtesyCardUseCase);

    const courtesy = await getCourtesyCardUseCase.execute(code);

    return response.status(200).json(courtesy);
  }
}

export { GetCourtesyCardController };
