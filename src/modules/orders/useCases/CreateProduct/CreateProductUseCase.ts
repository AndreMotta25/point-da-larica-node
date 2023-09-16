import { inject, injectable } from 'tsyringe';

import ErrorField from '@errors/ErrorField';
import { ProductType } from '@modules/orders/entities/Product';
import { IProductRepository } from '@modules/orders/repositories/IProductRepository';

import { ICreateProductRequest } from '../dtos/Request/ICreateProductRequest';

@injectable()
class CreateProductUseCase {
  private readonly repository: IProductRepository;

  constructor(@inject('ProductRepository') repository: IProductRepository) {
    this.repository = repository;
  }

  async execute({ name, value, description, type }: ICreateProductRequest) {
    const productAlreadyExists = await this.repository.findByName(name);

    if (productAlreadyExists)
      throw new ErrorField(name, 'Nome indisponivel', 'name', 400);

    if (type && !(type in ProductType))
      throw new ErrorField('tipo', 'Tipo de produto não aceito', 'type', 400);

    await this.repository.create({ name, value, description, type });
  }
}

export { CreateProductUseCase };
