import { inject, injectable } from 'tsyringe';

import ErrorField from '@errors/ErrorField';
import { IProductRepository } from '@modules/orders/repositories/IProductRepository';

import { ICreateProductRequest } from '../dtos/Request/ICreateProductRequest';

@injectable()
class CreateProductUseCase {
  private readonly repository: IProductRepository;

  constructor(@inject('ProductRepository') repository: IProductRepository) {
    this.repository = repository;
  }

  async execute({ name, value, description, image }: ICreateProductRequest) {
    const productAlreadyExists = await this.repository.findByName(name);

    if (productAlreadyExists)
      throw new ErrorField(name, 'Nome indisponivel', 'name', 400);

    await this.repository.create({ name, value, description, image });
  }
}

export { CreateProductUseCase };
