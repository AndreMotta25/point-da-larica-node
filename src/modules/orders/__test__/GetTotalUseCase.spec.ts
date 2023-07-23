import { v4 } from 'uuid';

import { Product } from '../entities/Product';
import { ProductRepositoryInMemory } from '../repositories/inMemory/ProductRepositoryInMemory';
import { IProductRepository } from '../repositories/IProductRepository';
import { GetTotalUseCase } from '../useCases/GetTotal/GetTotalUseCase';

let getTotalUseCase: GetTotalUseCase;
let repositoryProduct: IProductRepository;

describe('Retorna total de itens', () => {
  beforeEach(() => {
    repositoryProduct = new ProductRepositoryInMemory();
    getTotalUseCase = new GetTotalUseCase(repositoryProduct);
  });

  test('Deveria retornar o total de itens', async () => {
    await repositoryProduct.create({
      name: 'x-burguer',
      value: 10,
      description: 'An Delicius hamburguer',
      image: '',
    });
    const food1 = (await repositoryProduct.findByName('x-burguer')) as Product;

    await repositoryProduct.create({
      name: 'cake',
      value: 5,
      description: 'A piece of cake',
      image: '',
    });
    const food2 = (await repositoryProduct.findByName('cake')) as Product;

    const total = await getTotalUseCase.execute([
      { id: food1?.id, amount: 2 },
      { id: food2.id, amount: 1 },
    ]);
    expect(total).toBe(25);
  });
  test('Deveria ocorrer um erro ao não achar o produto', async () => {
    await expect(async () => {
      await getTotalUseCase.execute([{ id: v4(), amount: 2 }]);
    }).rejects.toHaveProperty('msg', 'Produto não existe');
  });
});
