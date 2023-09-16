import { inject, injectable } from 'tsyringe';

import AppError from '@errors/AppError';
import { IProductRepository } from '@modules/orders/repositories/IProductRepository';
import { types } from '@utils/typesOfProduct';

import { IGetProductResponse } from '../dtos/Response/IGetProductResponse';

@injectable()
class GetProductUseCase {
  constructor(
    @inject('ProductRepository') private repository: IProductRepository
  ) {}
  async execute(id: string): Promise<IGetProductResponse> {
    const product = await this.repository.findById(id);
    if (!product) throw new AppError('Produto não achado', 404);

    return {
      id: product.id,
      description: product.description,
      name: product.name,
      price: Number(product.value),
      image: product.image,
      type: types[product.type],
    };
  }
}

export { GetProductUseCase };
