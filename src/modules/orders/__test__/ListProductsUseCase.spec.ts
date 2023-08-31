import { ProductType } from '../entities/Product';
import { ProductRepositoryInMemory } from '../repositories/inMemory/ProductRepositoryInMemory';
import { IProductRepository } from '../repositories/IProductRepository';
import { ListProductsUseCase } from '../useCases/ListProducts/ListProductsUseCase';

let listProductsUseCase: ListProductsUseCase;
let productRepository: IProductRepository;

describe('Lista Produtos', () => {
  beforeEach(() => {
    productRepository = new ProductRepositoryInMemory();
    listProductsUseCase = new ListProductsUseCase(productRepository);
  });

  test('Deveria listar todos os produtos', async () => {
    await productRepository.create({
      name: 'x-burguer',
      description: 'A delicious x-burguer',
      image: '',
      value: 10,
      type: ProductType.FRITAS,
    });
    await productRepository.create({
      name: 'cake',
      description: 'A wonderfull cake',
      image: '',
      value: 20,
      type: ProductType.FRITAS,
    });

    const products = await listProductsUseCase.execute();
    expect(products.length).toBe(2);
  });
});
