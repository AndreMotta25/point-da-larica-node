import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListProductsUseCase } from './ListProductsUseCase';

class ListProductController {
  async handle(request: Request, response: Response) {
    const listProductsUseCase = container.resolve(ListProductsUseCase);

    const products = await listProductsUseCase.execute();
    return response.status(200).json(products);
  }
}

export { ListProductController };
