import { Request, Response } from 'express';
import { validator } from 'src/emailProvider/resultValidator/implements/validator';
import { container } from 'tsyringe';

import { UpdateProductUseCase } from './UpdateProductUseCase';

class UpdateProductController {
  async handle(request: Request, response: Response) {
    const result = validator(request);

    if (result.hasErrors())
      return response.status(400).json({ errors: result.getErrors() });

    const { id } = request.params;
    const { value, name, description } = request.body;
    const { file } = request;

    const updateUseCase = container.resolve(UpdateProductUseCase);
    await updateUseCase.execute({
      id,
      value,
      name,
      description,
      image: file?.filename as string,
    });

    return response.status(204).json();
  }
}

export { UpdateProductController };
