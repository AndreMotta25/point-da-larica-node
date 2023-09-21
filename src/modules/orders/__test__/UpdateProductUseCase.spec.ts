import { v4 } from 'uuid';

import AppError from '@errors/AppError';

import { Product, ProductType } from '../entities/Product';
import { ProductRepositoryInMemory } from '../repositories/inMemory/ProductRepositoryInMemory';
import { IProductRepository } from '../repositories/IProductRepository';
import { ICreateProductRequest } from '../useCases/dtos/Request/ICreateProductRequest';
import { UpdateProductUseCase } from '../useCases/UpdateProduct/UpdateProductUseCase';

let productRepository: IProductRepository;
let updateProductUseCase: UpdateProductUseCase;

describe('Atualizar Produto', () => {
  beforeEach(() => {
    productRepository = new ProductRepositoryInMemory();
    updateProductUseCase = new UpdateProductUseCase(productRepository);
  });
  test('Deveria atualizar um produto', async () => {
    const product: ICreateProductRequest = {
      name: 'x-burguer',
      description: 'An delicious hamburguer',
      value: 5,
      type: ProductType.COMBO,
    };
    await productRepository.create(product);

    const { id } = (await productRepository.findByName('x-burguer')) as Product;

    await updateProductUseCase.execute({
      name: 'x-burguer',
      description: 'An delicious and beauty hamburguer',
      value: 10,
      id,
      type: ProductType.COMBO,
    });
    const productUpdated = (await productRepository.findByName(
      'x-burguer'
    )) as Product;

    expect(productUpdated.value).toBe(10);
  });
  test('Deveria ocorrer um erro ao não achar o produto', async () => {
    await expect(async () => {
      await updateProductUseCase.execute({
        name: 'x-burguer',
        description: 'An delicious and beauty hamburguer',
        value: 10,
        id: v4(),
        type: ProductType.COMBO,
      });
    }).rejects.toBeInstanceOf(AppError);
    await expect(async () => {
      await updateProductUseCase.execute({
        name: 'x-burguer',
        description: 'An delicious and beauty hamburguer',
        value: 10,
        id: v4(),
        type: ProductType.COMBO,
      });
    }).rejects.toHaveProperty('msg', 'Produto não achado');
  });
  test('Deveria ocorrer um erro pelo nome do produto não está disponivel', async () => {
    await expect(async () => {
      const product1: ICreateProductRequest = {
        name: 'x-burguer',
        description: 'An delicious hamburguer',
        value: 5,
        type: ProductType.COMBO,
      };
      await productRepository.create(product1);

      const product2: ICreateProductRequest = {
        name: 'x-egg',
        description: 'An delicious hamburguer',
        value: 3,
        type: ProductType.COMBO,
      };
      await productRepository.create(product2);

      const { id } = (await productRepository.findByName(
        'x-burguer'
      )) as Product;

      await updateProductUseCase.execute({
        name: 'x-egg',
        description: 'An delicious and beauty hamburguer',
        value: 10,
        id,
        type: ProductType.COMBO,
      });
    }).rejects.toHaveProperty('msg', 'Nome indisponivel');
  });
});
