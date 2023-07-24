import { Request, Response } from 'express';
import { validator } from 'src/provider/resultValidator/implements/validator';
import { container } from 'tsyringe';

import { GetProductUseCase } from './GetProductUseCase';

class GetProductController {
  async handle(request: Request, response: Response) {
    const result = validator(request);

    if (result.hasErrors())
      return response.status(400).json({ errors: result.getErrors() });

    const { id } = request.params;

    const getProductUseCase = container.resolve(GetProductUseCase);
    const product = await getProductUseCase.execute(id);

    return response.status(200).json(product);
  }
}

export { GetProductController };
