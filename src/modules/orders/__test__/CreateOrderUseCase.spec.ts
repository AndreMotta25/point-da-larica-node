import 'reflect-metadata';

import { MockProxy } from 'jest-mock-extended';
import mock from 'jest-mock-extended/lib/Mock';
import { container } from 'tsyringe';
import { v4 } from 'uuid';

import ICodeGenerator from '@modules/coupons/providers/interfaces/ICodeGenerator';
import DebitCouponUseCase from '@modules/coupons/useCases/DebitCoupon/DebitCouponUseCase';
import ValidCouponUseCase from '@modules/coupons/useCases/ValidCoupon/ValidCouponUseCase';
import { CourtesyCard } from '@modules/courtesy/entities/CourtesyCard';
import { ICourtesyCardRepository } from '@modules/courtesy/repositories/ICourtesyCardRepository';
import { UseCourtesyCardUseCase } from '@modules/courtesy/useCases/UseCourtesyCard/UseCourtesyCardUseCase';

import { ITransaction } from '../../../database/transactions/Transaction/ITransaction';
import { Delivery } from '../entities/Delivery';
import { IDeliveryRepository } from '../repositories/IDeliveryRepository';
import { IOrderListRepository } from '../repositories/IOrderListRepository';
import { IOrderRepository } from '../repositories/IOrderRepository';
import { IProductRepository } from '../repositories/IProductRepository';
import { CreateOrderUseCase } from '../useCases/CreateOrder/CreateOrderUseCase';
import { GetTotalUseCase } from '../useCases/GetTotal/GetTotalUseCase';

let createOrderUseCase: CreateOrderUseCase;
let transactions: MockProxy<ITransaction>;
let productRepository: MockProxy<IProductRepository>;
let orderListRepository: MockProxy<IOrderListRepository>;
let orderRepository: MockProxy<IOrderRepository>;
let deliveryRepository: MockProxy<IDeliveryRepository>;
let codeGenerator: MockProxy<ICodeGenerator>;
let courtesyCardRepository: MockProxy<ICourtesyCardRepository>;

const validCouponExecute = jest.fn(() => {
  return { id: v4(), value: 5, minimumValue: 1, code: 'AAC3' };
});
const debitCouponExecute = jest.fn();
const cortesyCardExecute = jest.fn(() => {
  return {
    id: v4(),
    value: 3,
    created_at: new Date('2023-06-03T00:00:00Z'),
    expiresIn: new Date('2023-06-30T00:00:00Z'),
    code: 'AXDC',
    cpf: 'xxx.xxx.xxx-xx',
    used: false,
    motivation: 'an test',
  };
});

jest.mock('@modules/coupons/useCases/ValidCoupon/ValidCouponUseCase', () => {
  return jest.fn().mockImplementation(() => {
    return {
      execute: validCouponExecute,
    };
  });
});

jest.mock('@modules/coupons/useCases/DebitCoupon/DebitCouponUseCase', () => {
  return jest.fn().mockImplementation(() => {
    return {
      execute: debitCouponExecute,
    };
  });
});

jest.mock(
  '@modules/courtesy/useCases/UseCourtesyCard/UseCourtesyCardUseCase',
  () => {
    return {
      UseCourtesyCardUseCase: jest.fn().mockImplementation(() => {
        return {
          execute: cortesyCardExecute,
        };
      }),
    };
  }
);

let GetTotalUseCaseMock: jest.Mock<any, any, any>;

describe('Criando pedido', () => {
  beforeEach(() => {
    transactions = mock();
    productRepository = mock();
    orderListRepository = mock();
    orderRepository = mock();
    deliveryRepository = mock();
    codeGenerator = mock();
    courtesyCardRepository = mock();

    GetTotalUseCaseMock = jest.fn().mockImplementation(() => {
      return {
        execute: jest.fn(() => 10),
      };
    });
    container.register(GetTotalUseCase, {
      useValue: new GetTotalUseCaseMock(),
    });

    createOrderUseCase = new CreateOrderUseCase(
      transactions,
      productRepository,
      orderListRepository,
      orderRepository,
      deliveryRepository,
      codeGenerator,
      courtesyCardRepository
    );
  });
  afterEach(() => {
    GetTotalUseCaseMock.mockClear();
    validCouponExecute.mockClear();
  });

  test('Deveria criar um pedido', async () => {
    const productId = v4();

    orderRepository.create.mockResolvedValue({
      id: v4(),
      full_value: 10,
      discount: 0,
      final_value: 10,
      coupon_code: '',
      code: 'ADEF',
      isDelivery: false,
      isSchedule: false,
      schedule_date: new Date(),
      additionalPayment: 0,
      canceled: false,
      courtesy: new CourtesyCard(),
      date_of_sale: new Date(),
      orderList: [],
      productList: [],
      delivery: new Delivery(),
    });
    productRepository.findById.mockResolvedValue({
      id: productId,
      description: 'teste',
      image: '',
      name: 'x-burguer',
      orderList: [],
      value: 5,
    });

    const order = await createOrderUseCase.execute({
      coupon_code: '',
      courtesy_code: '',
      isDelivery: false,
      adress: '',
      isSchedule: false,
      schedule_date: new Date(),
      itens: [{ id: productId, amount: 2 }],
    });

    expect(order?.id_order).not.toBeNull();
    expect(GetTotalUseCaseMock).toHaveBeenCalled();
    expect(transactions.commitTransaction).toHaveBeenCalled();
    expect(transactions.startTransaction).toHaveBeenCalled();
    expect(transactions.rollBackTransaction).not.toHaveBeenCalled();
  });

  test('Deveria ocorrer um erro quando o total for menor ou igual a zero', async () => {
    await expect(async () => {
      const productId = v4();

      const GetTotalUseCaseMock = jest.fn().mockImplementation(() => {
        return {
          execute: jest.fn(() => 0),
        };
      });

      container.register(GetTotalUseCase, {
        useValue: new GetTotalUseCaseMock(),
      });

      await createOrderUseCase.execute({
        coupon_code: '',
        courtesy_code: '',
        isDelivery: false,
        adress: '',
        isSchedule: false,
        schedule_date: new Date(),
        itens: [{ id: productId, amount: 2 }],
      });
    }).rejects.toHaveProperty('msg', 'O total não deve ser menor do que zero');
    expect(transactions.startTransaction).not.toHaveBeenCalled();
  });

  test('Deveria ser possivel utilizar um cupom no pedido', async () => {
    const productId = v4();
    orderRepository.create.mockResolvedValue({
      id: v4(),
      full_value: 10,
      discount: 5,
      final_value: 5,
      coupon_code: 'AAC3',
      code: 'ADEF',
      isDelivery: false,
      isSchedule: false,
      schedule_date: new Date(),
      additionalPayment: 0,
      canceled: false,
      courtesy: new CourtesyCard(),
      date_of_sale: new Date(),
      orderList: [],
      productList: [],
      delivery: new Delivery(),
    });
    productRepository.findById.mockResolvedValue({
      id: productId,
      description: 'teste',
      image: '',
      name: 'x-burguer',
      orderList: [],
      value: 5,
    });

    const order = await createOrderUseCase.execute({
      coupon_code: 'AAC3',
      courtesy_code: '',
      isDelivery: false,
      adress: '',
      isSchedule: false,
      schedule_date: new Date(),
      itens: [{ id: productId, amount: 2 }],
    });

    expect(order?.id_order).not.toBeNull();
    expect(validCouponExecute).toHaveBeenCalledWith('AAC3');
    expect(debitCouponExecute).toHaveBeenCalledWith('AAC3');
  });

  test('Deveria ocorrer um erro quando o total do pedido não alcançar o valor minimo para usar o cupom', async () => {
    await expect(async () => {
      validCouponExecute.mockImplementationOnce(() => {
        return { id: v4(), value: 5, minimumValue: 20, code: 'AAC3' };
      });

      await createOrderUseCase.execute({
        coupon_code: 'AAC3',
        courtesy_code: '',
        isDelivery: false,
        adress: '',
        isSchedule: false,
        schedule_date: new Date(),
        itens: [{ id: v4(), amount: 2 }],
      });
    }).rejects.toHaveProperty(
      'msg',
      'A compra não alcançou o valor minimo para usar o cupom'
    );
    expect(validCouponExecute).toHaveBeenCalledWith('AAC3');
    expect(transactions.startTransaction).toHaveBeenCalled();
  });

  test('Deveria ocorrer um erro sendo o pedido para entrega sem um endereço', async () => {
    await expect(async () => {
      orderRepository.create.mockResolvedValue({
        id: v4(),
        full_value: 10,
        discount: 5,
        final_value: 5,
        coupon_code: '',
        code: 'AAC3',
        isDelivery: true,
        isSchedule: false,
        schedule_date: new Date(),
        additionalPayment: 0,
        canceled: false,
        courtesy: new CourtesyCard(),
        date_of_sale: new Date(),
        orderList: [],
        productList: [],
        delivery: new Delivery(),
      });

      await createOrderUseCase.execute({
        coupon_code: 'AAC3',
        courtesy_code: '',
        isDelivery: true,
        adress: '',
        isSchedule: false,
        schedule_date: new Date(),
        itens: [{ id: v4(), amount: 2 }],
      });
    }).rejects.toHaveProperty('msg', 'Faltou o endereço de entrega');
    expect(transactions.startTransaction).toHaveBeenCalled();
    expect(transactions.rollBackTransaction).toHaveBeenCalled();
    expect(transactions.commitTransaction).not.toHaveBeenCalled();
  });
  test('Deveria registrar um pedido para entrega', async () => {
    const productId = v4();
    orderRepository.create.mockResolvedValue({
      id: v4(),
      full_value: 10,
      discount: 0,
      final_value: 10,
      coupon_code: '',
      code: 'ADEF',
      isDelivery: false,
      isSchedule: false,
      schedule_date: new Date(),
      additionalPayment: 0,
      canceled: false,
      courtesy: new CourtesyCard(),
      date_of_sale: new Date(),
      orderList: [],
      productList: [],
      delivery: new Delivery(),
    });
    productRepository.findById.mockResolvedValue({
      id: productId,
      description: 'teste',
      image: '',
      name: 'x-burguer',
      orderList: [],
      value: 5,
    });
    await createOrderUseCase.execute({
      coupon_code: '',
      courtesy_code: '',
      isDelivery: true,
      adress: 'Rua xxx',
      isSchedule: false,
      schedule_date: new Date(),
      itens: [{ id: productId, amount: 2 }],
    });
    expect(orderRepository.create).toHaveBeenCalled();
    expect(transactions.commitTransaction).toHaveBeenCalled();
    expect(transactions.startTransaction).toHaveBeenCalled();
    expect(deliveryRepository.create).toHaveBeenCalled();
  });

  test('Deveria ser possivel utilizar uma cortesia', async () => {
    const productId = v4();
    orderRepository.create.mockResolvedValue({
      id: v4(),
      full_value: 10,
      discount: 0,
      final_value: 10,
      coupon_code: '',
      code: 'ADEF',
      isDelivery: false,
      isSchedule: false,
      schedule_date: new Date(),
      additionalPayment: 0,
      canceled: false,
      courtesy: new CourtesyCard(),
      date_of_sale: new Date(),
      orderList: [],
      productList: [],
      delivery: new Delivery(),
    });
    productRepository.findById.mockResolvedValue({
      id: productId,
      description: 'teste',
      image: '',
      name: 'x-burguer',
      orderList: [],
      value: 5,
    });
    await createOrderUseCase.execute({
      coupon_code: '',
      courtesy_code: 'AXDC',
      isDelivery: false,
      adress: '',
      isSchedule: false,
      schedule_date: new Date(),
      itens: [{ id: productId, amount: 2 }],
    });
    expect(courtesyCardRepository.create).toHaveBeenCalled();
    expect(orderRepository.create).toHaveBeenCalledTimes(2);
    expect(transactions.commitTransaction).toHaveBeenCalled();
    expect(transactions.startTransaction).toHaveBeenCalled();
  });
});
