import { v4 } from 'uuid';

import AppError from '@errors/AppError';
import { OrderList } from '@modules/orders/entities/OrderList';
import { OrderRepositoryInMemory } from '@modules/orders/repositories/inMemory/OrderRepositoryInMemory';
import { ProductRepositoryInMemory } from '@modules/orders/repositories/inMemory/ProductRepositoryInMemory';

import { Product } from '../entities/Product';
import { CreateProductUseCase } from '../useCases/CreateProduct/CreateProductUseCase';
import { GetOrderUseCase } from '../useCases/GetOrder/GetOrderUseCase';

let orderRepository: OrderRepositoryInMemory;
let productRepository: ProductRepositoryInMemory;

let getOrderUseCase: GetOrderUseCase;
let createProduct: CreateProductUseCase;

describe('Pega uma pedido', () => {
  beforeEach(() => {
    orderRepository = new OrderRepositoryInMemory();
    productRepository = new ProductRepositoryInMemory();
    getOrderUseCase = new GetOrderUseCase(orderRepository, productRepository);
    createProduct = new CreateProductUseCase(productRepository);
  });

  it('Deveria retornar um pedido', async () => {
    await createProduct.execute({
      name: 'x-burguer',
      value: 10,
      description: 'An Delicius hamburguer',
      image: '',
    });

    const product = (await productRepository.findByName(
      'x-burguer'
    )) as Product;

    const order = await orderRepository.create({
      code: '3FAX',
      coupon_code: '',
      isDelivery: false,
      full_value: 10,
      additionalPayment: 0,
      schedule_date: new Date(),
      courtesy_code: '',
      final_value: 10,
      discount: 0,
      isSchedule: false,
    });

    const orderList = new OrderList();
    Object.assign(orderList, { productId: product.id, amount: 1, total: 10 });

    order.orderList = [orderList];

    const getOrder = await getOrderUseCase.execute(order.id);

    expect(getOrder.id).toEqual(order.id);
  });
  it('Deveria ocorrer um erro ao não achar o pedido', async () => {
    await expect(async () => {
      await getOrderUseCase.execute('145bf38a-7637-4608-ab6a-57d85a50a88d');
    }).rejects.toBeInstanceOf(AppError);

    await expect(async () => {
      await getOrderUseCase.execute('145bf38a-7637-4608-ab6a-57d85a50a88d');
    }).rejects.toHaveProperty('msg', 'Pedido não achado');
  });
  it('Deveria retornar um pedido para entrega', async () => {
    await createProduct.execute({
      name: 'x-burguer',
      value: 10,
      description: 'An Delicius hamburguer',
      image: '',
    });

    const product = (await productRepository.findByName(
      'x-burguer'
    )) as Product;

    const order = await orderRepository.create({
      code: '3FAX',
      coupon_code: '',
      isDelivery: true,
      full_value: 10,
      additionalPayment: 0,
      schedule_date: new Date(),
      courtesy_code: '',
      final_value: 10,
      discount: 0,
      isSchedule: false,
    });

    const orderList = new OrderList();
    Object.assign(orderList, { productId: product.id, amount: 1, total: 10 });

    order.orderList = [orderList];

    order.delivery = {
      id: v4(),
      adress: 'rua teste',
      orderId: order.id,
      send: false,
      status: '',
      order,
    };

    const getOrder = await getOrderUseCase.execute(order.id);
    expect(getOrder.isDelivery).toBeTruthy();
    expect(getOrder.delivery).toHaveProperty('address');
  });
});