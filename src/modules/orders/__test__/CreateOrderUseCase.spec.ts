import 'reflect-metadata';

import { MockProxy } from 'jest-mock-extended';
import mock from 'jest-mock-extended/lib/Mock';
import { container } from 'tsyringe';
import { v4 } from 'uuid';

import ICodeGenerator from '@modules/coupons/providers/interfaces/ICodeGenerator';
import DebitCouponUseCase from '@modules/coupons/useCases/DebitCoupon/DebitCouponUseCase';
import ValidCouponUseCase from '@modules/coupons/useCases/ValidCoupon/ValidCouponUseCase';
import { ICourtesyCardRepository } from '@modules/courtesy/repositories/ICourtesyCardRepository';
import { UseCourtesyCardUseCase } from '@modules/courtesy/useCases/UseCourtesyCard/UseCourtesyCardUseCase';

import { ITransaction } from '../../../database/transactions/Transaction/ITransaction';
import { ProductType } from '../entities/Product';
import { IDeliveryRepository } from '../repositories/IDeliveryRepository';
import { OrderRepositoryInMemory } from '../repositories/inMemory/OrderRepositoryInMemory';
import { IOrderListRepository } from '../repositories/IOrderListRepository';
import { IOrderRepository } from '../repositories/IOrderRepository';
import { IProductRepository } from '../repositories/IProductRepository';
import { CreateOrderUseCase } from '../useCases/CreateOrder/CreateOrderUseCase';
import { ICreateOrderResponse } from '../useCases/dtos/Response/ICreateOrderResponse';
import { GetTotalUseCase } from '../useCases/GetTotal/GetTotalUseCase';

let createOrderUseCase: CreateOrderUseCase;
let transactions: MockProxy<ITransaction>;
let productRepository: MockProxy<IProductRepository>;
let orderListRepository: MockProxy<IOrderListRepository>;
let orderRepository: IOrderRepository;
let deliveryRepository: MockProxy<IDeliveryRepository>;
let codeGenerator: MockProxy<ICodeGenerator>;
let courtesyCardRepository: MockProxy<ICourtesyCardRepository>;
const productId = v4();

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
    // orderRepository = mock();
    deliveryRepository = mock();
    codeGenerator = mock();
    courtesyCardRepository = mock();
    orderRepository = new OrderRepositoryInMemory();

    // Esta aqui só para aprendizado, pq não precisa ser feito assim.
    GetTotalUseCaseMock = jest.fn().mockImplementation(() => {
      return {
        execute: jest.fn(() => 10),
      };
    });
    container.register(GetTotalUseCase, {
      useValue: new GetTotalUseCaseMock(),
    });

    // mockando aqui não vou precisar de mockar em outras partes do teste.
    productRepository.findById.mockResolvedValue({
      id: productId,
      description: 'teste',
      image: '',
      name: 'x-burguer',
      orderList: [],
      value: 5,
      type: ProductType.FRITAS,
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
    codeGenerator.generateCode.mockReturnValue('ASF2');

    const { id_order } = (await createOrderUseCase.execute({
      coupon_code: '',
      courtesy_code: '',
      isDelivery: false,
      address: '',
      isSchedule: false,
      schedule_date: new Date(),
      itens: [{ id: productId, amount: 2 }],
    })) as ICreateOrderResponse;

    const order = await orderRepository.getOrder(id_order);

    expect(id_order).not.toBeNull();
    expect(order?.final_value).toBe(10);
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
        address: '',
        isSchedule: false,
        schedule_date: new Date(),
        itens: [{ id: productId, amount: 2 }],
      });
    }).rejects.toHaveProperty('msg', 'O total não deve ser menor do que zero');
    expect(transactions.startTransaction).not.toHaveBeenCalled();
  });

  test('Deveria ser possivel utilizar um cupom no pedido', async () => {
    codeGenerator.generateCode.mockReturnValue('ASF2');

    const { id_order } = (await createOrderUseCase.execute({
      coupon_code: 'AAC3',
      courtesy_code: '',
      isDelivery: false,
      address: '',
      isSchedule: false,
      schedule_date: new Date(),
      itens: [{ id: productId, amount: 2 }],
    })) as ICreateOrderResponse;

    const order = await orderRepository.getOrder(id_order);

    expect(id_order).not.toBeNull();
    expect(order?.final_value).toBe(5);
    expect(order?.discount).toBe(5);
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
        address: '',
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
      await createOrderUseCase.execute({
        coupon_code: 'AAC3',
        courtesy_code: '',
        isDelivery: true,
        address: '',
        isSchedule: false,
        schedule_date: new Date(),
        itens: [{ id: v4(), amount: 2 }],
      });
    }).rejects.toHaveProperty('msg', 'Faltou o endereço de entrega');
    expect(transactions.startTransaction).toHaveBeenCalled();
    expect(transactions.rollBackTransaction).toHaveBeenCalled();
    expect(transactions.commitTransaction).not.toHaveBeenCalled();
    expect(deliveryRepository.create).not.toHaveBeenCalled();
  });
  test('Deveria registrar um pedido para entrega', async () => {
    codeGenerator.generateCode.mockReturnValue('ASF2');

    const { id_order } = (await createOrderUseCase.execute({
      coupon_code: '',
      courtesy_code: '',
      isDelivery: true,
      address: 'Rua xxx',
      isSchedule: false,
      schedule_date: new Date(),
      itens: [{ id: productId, amount: 2 }],
    })) as ICreateOrderResponse;

    const order = await orderRepository.getOrder(id_order);

    expect(id_order).not.toBeNull();
    expect(order?.final_value).toBe(10);
    expect(order?.isDelivery).toBeTruthy();

    expect(transactions.commitTransaction).toHaveBeenCalled();
    expect(transactions.startTransaction).toHaveBeenCalled();
    expect(deliveryRepository.create).toHaveBeenCalled();
  });

  test('Deveria ser possivel utilizar uma cortesia', async () => {
    codeGenerator.generateCode.mockReturnValue('ASF2');
    const { id_order, remaining_balance } = (await createOrderUseCase.execute({
      coupon_code: '',
      courtesy_code: 'AXDC',
      cpf_client: 'xxx.xxx.xxx',
      isDelivery: false,
      address: '',
      isSchedule: false,
      schedule_date: new Date(),
      itens: [{ id: productId, amount: 2 }],
    })) as ICreateOrderResponse;

    const order = await orderRepository.getOrder(id_order);

    expect(remaining_balance).toBe(7);
    expect(order?.final_value).toBe(3);
    expect(courtesyCardRepository.create).toHaveBeenCalled();
    expect(transactions.commitTransaction).toHaveBeenCalled();
    expect(transactions.startTransaction).toHaveBeenCalled();
  });
});
