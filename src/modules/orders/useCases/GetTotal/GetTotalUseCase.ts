import { inject, injectable } from 'tsyringe';

import AppError from '@errors/AppError';
import { IProductRepository } from '@modules/orders/repositories/IProductRepository';

import { IProductList } from '../dtos/Request/ICreateOrderRequest';

@injectable()
class GetTotalUseCase {
  constructor(
    @inject('ProductRepository') private repositoryProduct: IProductRepository
  ) {}

  async execute(itens: IProductList[]) {
    const valuesPromise = itens.map(async (product) => {
      if (!product.id) throw new AppError('Produto não informado', 400);
      if (product.amount <= 0)
        throw new AppError(
          'A quantidade de itens não pode ser menor ou igual a zero',
          400
        );

      const productExist = await this.repositoryProduct.findById(product.id);
      if (!productExist) throw new AppError('Produto não existe', 404);

      return productExist.value * product.amount;
    });

    return this.calculateTotal(valuesPromise);
  }

  async calculateTotal(values: Promise<number>[]) {
    const value = await (
      await Promise.all(values)
    ).reduce((prev: number, current: number) => prev + current, 0);
    return value;
  }
}

export { GetTotalUseCase };
