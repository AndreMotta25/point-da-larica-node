import { Repository } from 'typeorm';

import { Product } from '@modules/orders/entities/Product';
import { IProductRequestDTO } from '@modules/orders/useCases/CreateProduct/IProductRequestDTO';

import database from '../../../../database';
import { IProductRepository } from '../IProductRepository';

class ProductRepository implements IProductRepository {
  private readonly repository: Repository<Product>;

  constructor() {
    this.repository = database.getRepository(Product);
  }
  async findById(id: string): Promise<Product | null> {
    const product = await this.repository.findOne({ where: { id } });
    return product;
  }

  async findByName(name: string): Promise<Product | null> {
    const product = await this.repository.findOne({ where: { name } });
    return product;
  }
  async create(product: IProductRequestDTO): Promise<void> {
    const productCopy = this.repository.create({ ...product });
    await this.repository.save(productCopy);
  }
}

export { ProductRepository };
