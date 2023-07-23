import { v4 } from 'uuid';

import AppError from '@errors/AppError';

import { IDeliveryRepository } from '../repositories/IDeliveryRepository';
import { OrderRepository } from '../repositories/implementations/OrderRepository';
import { DeliveryRepositoryInMemory } from '../repositories/inMemory/DeliveryRepositoryInMemory';
import { OrderRepositoryInMemory } from '../repositories/inMemory/OrderRepositoryInMemory';
import { IOrderRepository } from '../repositories/IOrderRepository';
import { SendOrderUseCase } from '../useCases/SendOrder/SendOrderUseCase';

let sendOrderUseCase: SendOrderUseCase;
let deliveryRepository: IDeliveryRepository;
let orderRepository: IOrderRepository;

describe('Envia um pedido', () => {
  beforeEach(() => {
    orderRepository = new OrderRepositoryInMemory();
    deliveryRepository = new DeliveryRepositoryInMemory();
    sendOrderUseCase = new SendOrderUseCase(deliveryRepository);
  });
  test('Deveria enviar um pedido', async () => {
    const order = await orderRepository.create({
      code: 'GXWE',
      discount: 0,
      final_value: 10,
      isDelivery: true,
      full_value: 10,
      additionalPayment: 0,
      isSchedule: false,
      coupon_code: '',
      courtesy_code: '',
      schedule_date: new Date(),
    });
    order.date_of_sale = new Date();

    await deliveryRepository.create({ adress: 'Rua do figo, 51', order });

    const delivery = await sendOrderUseCase.execute(order.id);
    expect(delivery.send).toBeTruthy();
  });
  test('Deveria ocorrer um erro ao não achar o pedido', async () => {
    await expect(async () => {
      await sendOrderUseCase.execute(v4());
    }).rejects.toBeInstanceOf(AppError);
  });
});
