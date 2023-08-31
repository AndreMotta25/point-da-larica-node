import 'reflect-metadata';
import { mock, MockProxy } from 'jest-mock-extended';
import { v4 } from 'uuid';

import { ProductType } from '../entities/Product';
import { ProductRepository } from '../repositories/implementations/ProductRepository';
import { GetProductUseCase } from '../useCases/GetProduct/GetProductUseCase';

let productRepository: MockProxy<ProductRepository>;
let getProductUseCase: GetProductUseCase;

describe('first', () => {
  beforeEach(() => {
    productRepository = mock();
    getProductUseCase = new GetProductUseCase(productRepository);
  });

  test('Deveria retornar um produto pelo id', async () => {
    const productId = v4();
    productRepository.findById.mockResolvedValue({
      id: productId,
      name: 'teste',
      description: 'isso é um teste',
      image: './teste.png',
      value: 0,
      orderList: [],
      type: ProductType.COMBO,
    });
    const product = await getProductUseCase.execute(productId);
    expect(product.id).toEqual(productId);
  });
  test('Deveria ocorrer um erro ao não achar um produto', async () => {
    await expect(async () => {
      await getProductUseCase.execute(v4());
    }).rejects.toHaveProperty('msg', 'Produto não achado');
  });
});
