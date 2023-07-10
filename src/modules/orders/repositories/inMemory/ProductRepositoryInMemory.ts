import { Order } from '@modules/orders/entities/Order';
import { Product } from '@modules/orders/entities/Product';
import { ICreateProductRequest } from '@modules/orders/useCases/dtos/Request/ICreateProductRequest';

import { IProductRepository } from '../IProductRepository';

class ProductRepositoryInMemory implements IProductRepository {
  private readonly products: Product[];

  constructor() {
    this.products = [];
  }
  async getAllProducts(): Promise<Product[]> {
    return this.products;
  }

  async create(product: ICreateProductRequest): Promise<void> {
    let newProduct: Product;
    if (product.id) {
      newProduct = (await this.findById(product.id)) as Product;
      Object.assign(newProduct, { ...product });
    } else {
      newProduct = new Product();
      Object.assign(newProduct, { ...product });
      this.products.push(newProduct);
    }
  }
  async findByName(name: string): Promise<Product | null> {
    const product = this.products.find((product) => product.name === name);
    if (product) return product;
    return null;
  }
  async findById(id: string): Promise<Product | null> {
    const product = this.products.find((product) => product.id === id);
    return product || null;
  }
}
export { ProductRepositoryInMemory };
