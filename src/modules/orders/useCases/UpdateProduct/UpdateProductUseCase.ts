import { unlink } from 'fs';
import { inject, injectable } from 'tsyringe';

import AppError from '@errors/AppError';
import ErrorField from '@errors/ErrorField';
import { IProductRepository } from '@modules/orders/repositories/IProductRepository';

import { ICreateProductRequest } from '../dtos/Request/ICreateProductRequest';

@injectable()
class UpdateProductUseCase {
  constructor(
    @inject('ProductRepository') private repository: IProductRepository
  ) {}

  async execute({
    value,
    name,
    description,
    image,
    id,
  }: ICreateProductRequest) {
    const product = await this.repository.findById(id as string);
    if (!product) throw new AppError('Produto não achado', 404);

    const productAllReadyExists = await this.repository.findByName(name);

    if (productAllReadyExists && !(productAllReadyExists.id === product.id)) {
      throw new ErrorField(name, 'Nome indisponivel', 'name', 400);
    }

    // talvez isso saia daqui
    if (product.image && image) {
      unlink(`./images/${product.image}`, (error) => {
        if (error && error.code === 'ENOENT')
          throw new AppError('O arquivo não existe mais');
      });
    }

    Object.assign(product, { name, value, description, image });
    await this.repository.create(product);

    // validar os valores com o express
    return product;
  }
}

export { UpdateProductUseCase };
// image-1683423140470
