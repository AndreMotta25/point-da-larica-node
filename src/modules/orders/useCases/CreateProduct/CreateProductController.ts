import { Request, Response } from 'express';
import { validator } from 'src/provider/resultValidator/implements/validator';
import { container } from 'tsyringe';

import { CreateProductUseCase } from './CreateProductUseCase';

class CreateProductController {
  async handler(request: Request, response: Response) {
    const result = validator(request);

    if (result.hasErrors())
      return response.status(400).json({ errors: result.getErrors() });

    // const { file } = request;

    const { name, value, description, type } = request.body;

    const createUseCase = container.resolve(CreateProductUseCase);

    await createUseCase.execute({
      name,
      value,
      description,
      type,
    });

    return response.status(201).send();
  }
}

export { CreateProductController };
