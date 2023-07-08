import { Product } from '../entities/Product';
import { ICreateProductRequest } from '../useCases/dtos/Request/ICreateProductRequest';

interface IProductRepository {
  create(product: ICreateProductRequest): Promise<void>;
  findByName(name: string): Promise<Product | null>;
  findById(id: string): Promise<Product | null>;
  getAllProducts(): Promise<Product[]>;
}
export { IProductRepository };
