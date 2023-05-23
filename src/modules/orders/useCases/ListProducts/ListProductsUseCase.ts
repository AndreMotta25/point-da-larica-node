import { inject, injectable } from 'tsyringe';

import { IProductRepository } from '@modules/orders/repositories/IProductRepository';

@injectable()
class ListProductsUseCase {
  constructor(
    @inject('ProductRepository') private repository: IProductRepository
  ) {}

  async execute() {
    const products = await this.repository.getAllProducts();
    return products;
  }
}

export { ListProductsUseCase };
