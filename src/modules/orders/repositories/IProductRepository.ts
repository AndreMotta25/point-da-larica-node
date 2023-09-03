import { Product, ProductType } from '../entities/Product';
import { ICreateProductRequest } from '../useCases/dtos/Request/ICreateProductRequest';

interface IProductRepository {
  create(product: ICreateProductRequest): Promise<void>;
  findByName(name: string): Promise<Product | null>;
  findById(id: string): Promise<Product | null>;
  getAllProducts(type: ProductType): Promise<Product[]>;
}
export { IProductRepository };
