import { IProductRequestDTO } from '@modules/orders/useCases/CreateProduct/IProductRequestDTO';

import { Product } from '../entities/Product';

interface IProductRepository {
  create(product: IProductRequestDTO): Promise<void>;
  findByName(name: string): Promise<Product | null>;
  findById(id: string): Promise<Product | null>;
}
export { IProductRepository };
