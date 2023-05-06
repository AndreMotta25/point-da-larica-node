import { inject, injectable } from 'tsyringe';

import AppError from '@errors/AppError';
import { IProductRepository } from '@modules/orders/repositories/IProductRepository';

@injectable()
class GetProductUseCase {
  constructor(
    @inject('ProductRepository') private repository: IProductRepository
  ) {}
  async execute(id: string) {
    const product = await this.repository.findById(id);
    if (!product) throw new AppError('Produto não achado', 404);

    return product;
  }
}

export { GetProductUseCase };
