import { inject, injectable } from 'tsyringe';

import { Product, ProductType } from '@modules/orders/entities/Product';
import { IProductRepository } from '@modules/orders/repositories/IProductRepository';

import { IGetProductResponse } from '../dtos/Response/IGetProductResponse';

@injectable()
class ListProductsUseCase {
  constructor(
    @inject('ProductRepository') private repository: IProductRepository
  ) {}

  async execute(typeOfProduct: string): Promise<IGetProductResponse[]> {
    let products: Product[];

    if (typeOfProduct in ProductType) {
      products = await this.repository.getAllProducts(
        ProductType[typeOfProduct as keyof typeof ProductType]
      );
    } else products = await this.repository.getAllProducts(ProductType.LANCHES);

    return products.map((elem) => {
      const product: IGetProductResponse = {
        id: elem.id,
        description: elem.description,
        name: elem.name,
        image: elem.image,
        type: ProductType[elem.type],
        price: elem.value,
      };
      return product;
    });
  }
}

export { ListProductsUseCase };
