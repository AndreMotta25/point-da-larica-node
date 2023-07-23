import 'reflect-metadata';
import { mock, MockProxy } from 'jest-mock-extended';

import { IOrderRepository } from '../repositories/IOrderRepository';
import {
  ISalesOfWeek,
  SalesOfWeekUseCase,
} from '../useCases/SalesOfWeek/SalesOfWeekUseCase';

let orderRepository: MockProxy<IOrderRepository>;
let salesOfWeekUseCase: SalesOfWeekUseCase;

describe('Pedidos da semana', () => {
  beforeEach(() => {
    orderRepository = mock();
    salesOfWeekUseCase = new SalesOfWeekUseCase(orderRepository);
  });
  test('Deveria retornar a quantidade de pedidos feitos por cada dia da semana baseando entre duas datas', async () => {
    const orders: ISalesOfWeek[] = [
      { count: 2, date_trunc: new Date('2023-06-02T00:00:00'), sum: 20 },
      { count: 3, date_trunc: new Date('2023-06-04T00:00:00'), sum: 10 },
    ];

    orderRepository.getSalesOfWeek.mockResolvedValue(orders);

    const result = await salesOfWeekUseCase.execute({
      minDate: new Date('2023-06-01'),
      maxDate: new Date('2023-06-05'),
    });

    expect(result.length).toBe(2);
    expect(result[0]).toHaveProperty('day');
  });
  test('Deveria retornar a quantidade de pedidos feitos por cada dia da semana, sem passar uma data especifica', async () => {
    const orders: ISalesOfWeek[] = [
      { count: 2, date_trunc: new Date('2023-06-02T00:00:00'), sum: 20 },
      { count: 3, date_trunc: new Date('2023-06-04T00:00:00'), sum: 10 },
    ];

    orderRepository.getSalesOfWeek.mockResolvedValue(orders);

    const result = await salesOfWeekUseCase.execute({});

    expect(result.length).toBe(2);
    expect(result[0]).toHaveProperty('day');
  });
});
