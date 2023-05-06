import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { container } from 'tsyringe';

import { CreateProductUseCase } from './CreateProductUseCase';

class CreateProductController {
  async handler(request: Request, response: Response) {
    const errors = validationResult(request);
    const { file } = request;

    if (!errors.isEmpty())
      return response.status(400).json({ errors: errors.array() });

    const { name, value, description } = request.body;

    const createUseCase = container.resolve(CreateProductUseCase);

    await createUseCase.execute({
      name,
      value,
      description,
      image: file?.filename as string,
    });

    return response.status(201).send();
  }
}

export { CreateProductController };
