import { v4 } from 'uuid';

import AppError from '@errors/AppError';

import { OrderRepositoryInMemory } from '../repositories/inMemory/OrderRepositoryInMemory';
import { IOrderRepository } from '../repositories/IOrderRepository';
import { AdditionalPaymentUseCase } from '../useCases/AdditionalPayment/AdditionalPaymentUseCase';

let additionalPaymentUseCase: AdditionalPaymentUseCase;
let orderRepository: IOrderRepository;
const idEmployer = v4();
const employer = {
  id: idEmployer,
  name: 'user test',
  cpf: 'xxx.xxx.xxx-xx',
  email: 'teste@gmail.com',
  created_at: new Date(),
  hashToken: v4(),
  password: '12345',
  roles: [],
  situation: true,
};

describe('Pagamento adicional', () => {
  beforeEach(() => {
    orderRepository = new OrderRepositoryInMemory();
    additionalPaymentUseCase = new AdditionalPaymentUseCase(orderRepository);
  });

  test('Deveria fazer o pagamento adicional', async () => {
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
      employer,
    });

    const { finalized, remaining_balance } =
      await additionalPaymentUseCase.execute({ id, value: 5 });

    const order = await orderRepository.getOrder(id);

    expect(remaining_balance).toBe(0);
    expect(finalized).toBeTruthy();
    expect(order?.final_value).toBe(15);
    expect(order?.additionalPayment).toBe(5);
  });
  test('Deveria ocorre um erro não achar o pedido', async () => {
    await expect(async () => {
      await additionalPaymentUseCase.execute({ id: v4(), value: 5 });
    }).rejects.toBeInstanceOf(AppError);
  });
});
