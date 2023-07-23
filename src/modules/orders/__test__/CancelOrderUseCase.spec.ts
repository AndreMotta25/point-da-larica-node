import { v4 } from 'uuid';

import { OrderRepositoryInMemory } from '../repositories/inMemory/OrderRepositoryInMemory';
import { IOrderRepository } from '../repositories/IOrderRepository';
import { CancelOrderUseCase } from '../useCases/CancelOrder/CancelOrderUseCase';

let orderRepository: IOrderRepository;
let cancelOrderUseCase: CancelOrderUseCase;

describe('Cancela um pedido', () => {
  beforeEach(() => {
    orderRepository = new OrderRepositoryInMemory();
    cancelOrderUseCase = new CancelOrderUseCase(orderRepository);
  });
  test('Deveria cancelar um pedido', async () => {
    const { id } = await orderRepository.create({
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
    const order = await cancelOrderUseCase.execute(id);
    expect(order.canceled).toBeTruthy();
  });
  test('Deveria ocorrer um erro ao não achar o pedido', async () => {
    await expect(async () => {
      await cancelOrderUseCase.execute(v4());
    }).rejects.toHaveProperty('msg', 'Pedido não achado');
  });
});
