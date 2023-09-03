import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListProductsUseCase } from './ListProductsUseCase';

class ListProductController {
  async handle(request: Request, response: Response) {
    const { type } = request.query;

    const listProductsUseCase = container.resolve(ListProductsUseCase);

    const products = await listProductsUseCase.execute(
      (type as string)?.toUpperCase()
    );
    return response.status(200).json(products);
  }
}

export { ListProductController };
