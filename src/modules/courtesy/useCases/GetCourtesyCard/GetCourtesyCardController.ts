import { Request, Response } from 'express';
import { validator } from 'src/provider/resultValidator/implements/validator';
import { container } from 'tsyringe';

import { GetCourtesyCardUseCase } from './GetCourtesyCardUseCase';

class GetCourtesyCardController {
  async handle(request: Request, response: Response) {
    const result = validator(request);

    if (result.hasErrors())
      return response.status(400).json({ errors: result.getErrors() });

    const { code } = request.params;

    const getCourtesyCardUseCase = container.resolve(GetCourtesyCardUseCase);

    const courtesy = await getCourtesyCardUseCase.execute(code);

    return response.status(200).json(courtesy);
  }
}

export { GetCourtesyCardController };
