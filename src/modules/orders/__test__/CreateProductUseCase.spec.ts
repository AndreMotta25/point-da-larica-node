import ErrorField from '@errors/ErrorField';
import { ProductRepositoryInMemory } from '@modules/orders/repositories/inMemory/ProductRepositoryInMemory';

import { ProductType } from '../entities/Product';
import { CreateProductUseCase } from '../useCases/CreateProduct/CreateProductUseCase';

let createProductUseCase: CreateProductUseCase;
let productRepository: ProductRepositoryInMemory;

/*

Não acho que é uma boa usar o useCase que não esteja sendo testado pq se o useCase que não está sendo testado
mudar todo o codigo provavelmente vai quebrar. 

Exemplo: abaixo estou testando o serviço de criar um produto, mas sei que em algum lugar 
dos testes de order estou usando esse mesmo serviço e lá, os testes já quebraram tmabém, mesmo o caso de uso não
sendo parte do escopo do order e na hora de concertas os testes, o trabalham é dobrado.

*/

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
      type: ProductType.LANCHES,
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
        type: ProductType.LANCHES,
      });
      await createProductUseCase.execute({
        name: 'test name',
        value: 5.0,
        description: 'description teste',
        type: ProductType.LANCHES,
      });
    };
    await expect(createProductFail()).rejects.toBeInstanceOf(ErrorField);
    await expect(createProductFail()).rejects.toHaveProperty(
      'msg',
      'Nome indisponivel'
    );
  });
});
