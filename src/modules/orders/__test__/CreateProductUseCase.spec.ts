import ErrorField from '@errors/ErrorField';
import { ProductRepositoryInMemory } from '@modules/orders/repositories/inMemory/ProductRepositoryInMemory';

import { CreateProductUseCase } from '../useCases/CreateProduct/CreateProductUseCase';

let createProductUseCase: CreateProductUseCase;
let productRepository: ProductRepositoryInMemory;

describe('Create a product', () => {
  beforeEach(() => {
    productRepository = new ProductRepositoryInMemory();
    createProductUseCase = new CreateProductUseCase(productRepository);
  });
  it('Deveria criar um produto', async () => {
    await createProductUseCase.execute({
      name: 'test name',
      value: 5.0,
      description: 'description teste',
      image: '',
    });
    const product = await productRepository.findByName('test name');

    expect(product).toHaveProperty('id');
  });
  it('Should not create a product with an existing name', async () => {
    const createProductFail = async () => {
      await createProductUseCase.execute({
        name: 'test name',
        value: 5.0,
        description: 'description teste',
        image: '',
      });
      await createProductUseCase.execute({
        name: 'test name',
        value: 5.0,
        description: 'description teste',
        image: '',
      });
    };
    await expect(createProductFail()).rejects.toBeInstanceOf(ErrorField);
    await expect(createProductFail()).rejects.toHaveProperty(
      'msg',
      'Nome indisponivel'
    );
  });
});
