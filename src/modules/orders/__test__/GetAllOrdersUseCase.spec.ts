import { OrderRepositoryInMemory } from '@modules/orders/repositories/inMemory/OrderRepositoryInMemory';

import { GetAllOrderUseCase } from '../useCases/GetAllOrders/GetAllOrderUseCase';

let orderRepository: OrderRepositoryInMemory;

let getAllOrderUseCase: GetAllOrderUseCase;

describe('Pega uma pedido', () => {
  beforeEach(() => {
    orderRepository = new OrderRepositoryInMemory();
    getAllOrderUseCase = new GetAllOrderUseCase(orderRepository);
  });

  it('Deveria retornar todos os pedidos', async () => {
    await orderRepository.create({
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
    await orderRepository.create({
      code: 'AXAX',
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

    const getOrders = await getAllOrderUseCase.execute({ limit: 1, page: 1 });

    expect(getOrders.length).toEqual(2);
  });
});
