import { v4 } from 'uuid';

import { Employer } from '@modules/users/entities/Employer';

import { Delivery } from '../entities/Delivery';
import { OrderRepositoryInMemory } from '../repositories/inMemory/OrderRepositoryInMemory';
import { IOrderRepository } from '../repositories/IOrderRepository';
import { ListOrderByUseCase } from '../useCases/ListOrderBy/ListOrderByUseCase';

let orderRepository: IOrderRepository;
let listOrderByUseCase: ListOrderByUseCase;
const idEmployer = v4();
let employer: Employer;

describe('Lista os pedidos', () => {
  beforeEach(() => {
    orderRepository = new OrderRepositoryInMemory();
    listOrderByUseCase = new ListOrderByUseCase(orderRepository);

    employer = {
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
  });

  test('Deveria retornar os pedidos de uma data especifica', async () => {
    const order = await orderRepository.create({
      code: '12345',
      discount: 0,
      final_value: 10,
      isDelivery: false,
      full_value: 10,
      additionalPayment: 0,
      isSchedule: false,
      coupon_code: '',
      courtesy_code: '',
      schedule_date: new Date(),
      employer,
    });
    order.date_of_sale = new Date();

    const orders = await listOrderByUseCase.execute({
      date: new Date().toLocaleDateString(),
      isDelivery: 0,
      isSchedule: 0,
      limit: 1,
      page: 1,
    });

    expect(orders.length).toBe(1);
    expect(orders[0].date_of_sale.toLocaleDateString()).toEqual(
      new Date().toLocaleDateString()
    );
  });
  test('Deveria retornar os pedidos entre uma data e outra', async () => {
    const firstOrder = await orderRepository.create({
      code: 'HIJJ',
      discount: 0,
      final_value: 10,
      isDelivery: false,
      full_value: 10,
      additionalPayment: 0,
      isSchedule: false,
      coupon_code: '',
      courtesy_code: '',
      schedule_date: new Date(),
      employer,
    });
    const secundaryOrder = await orderRepository.create({
      code: 'GXWE',
      discount: 0,
      final_value: 10,
      isDelivery: false,
      full_value: 10,
      additionalPayment: 0,
      isSchedule: false,
      coupon_code: '',
      courtesy_code: '',
      schedule_date: new Date(),
      employer,
    });
    const thirtyOrder = await orderRepository.create({
      code: 'HAXE',
      discount: 0,
      final_value: 10,
      isDelivery: false,
      full_value: 10,
      additionalPayment: 0,
      isSchedule: false,
      coupon_code: '',
      courtesy_code: '',
      schedule_date: new Date(),
      employer,
    });
    const fourthOrder = await orderRepository.create({
      code: 'QXXE',
      discount: 0,
      final_value: 10,
      isDelivery: false,
      full_value: 10,
      additionalPayment: 0,
      isSchedule: false,
      coupon_code: '',
      courtesy_code: '',
      schedule_date: new Date(),
      employer,
    });

    firstOrder.date_of_sale = new Date('2023-07-01T22:00:00');
    secundaryOrder.date_of_sale = new Date('2023-07-02T18:00:00');
    thirtyOrder.date_of_sale = new Date('2023-07-03T12:00:00');
    fourthOrder.date_of_sale = new Date('2023-07-04T12:00:00');

    const orders = await listOrderByUseCase.execute({
      isDelivery: 0,
      isSchedule: 0,
      limit: 1,
      page: 1,
      minDate: '2023-07-01',
      maxDate: '2023-07-03',
    });

    expect(orders.length).toBe(3);
  });
  test('Deveria retornar os pedidos feitos no dia', async () => {
    const firstOrder = await orderRepository.create({
      code: 'HIJJ',
      discount: 0,
      final_value: 10,
      isDelivery: false,
      full_value: 10,
      additionalPayment: 0,
      isSchedule: false,
      coupon_code: '',
      courtesy_code: '',
      schedule_date: new Date(),
      employer,
    });
    const secundaryOrder = await orderRepository.create({
      code: 'GXWE',
      discount: 0,
      final_value: 10,
      isDelivery: false,
      full_value: 10,
      additionalPayment: 0,
      isSchedule: false,
      coupon_code: '',
      courtesy_code: '',
      schedule_date: new Date(),
      employer,
    });
    const thirtyOrder = await orderRepository.create({
      code: 'HAXE',
      discount: 0,
      final_value: 10,
      isDelivery: false,
      full_value: 10,
      additionalPayment: 0,
      isSchedule: false,
      coupon_code: '',
      courtesy_code: '',
      schedule_date: new Date(),
      employer,
    });
    const fourthOrder = await orderRepository.create({
      code: 'QXXE',
      discount: 0,
      final_value: 10,
      isDelivery: false,
      full_value: 10,
      additionalPayment: 0,
      isSchedule: false,
      coupon_code: '',
      courtesy_code: '',
      schedule_date: new Date(),
      employer,
    });

    firstOrder.date_of_sale = new Date();
    secundaryOrder.date_of_sale = new Date();
    thirtyOrder.date_of_sale = new Date();
    fourthOrder.date_of_sale = new Date();

    const orders = await listOrderByUseCase.execute({
      isDelivery: 0,
      isSchedule: 0,
      limit: 1,
      page: 1,
    });

    expect(orders.length).toBe(4);
  });
  test('Deveria retornar os pedidos que são para entrega', async () => {
    const firstOrder = await orderRepository.create({
      code: 'HIJJ',
      discount: 0,
      final_value: 10,
      isDelivery: true,
      full_value: 10,
      additionalPayment: 0,
      isSchedule: false,
      coupon_code: '',
      courtesy_code: '',
      schedule_date: new Date(),
      employer,
    });

    const secundaryOrder = await orderRepository.create({
      code: 'GXWE',
      discount: 0,
      final_value: 10,
      isDelivery: false,
      full_value: 10,
      additionalPayment: 0,
      isSchedule: false,
      coupon_code: '',
      courtesy_code: '',
      schedule_date: new Date(),
      employer,
    });

    const delivery = new Delivery();
    Object.assign(delivery, {
      adress: '',
      send: false,
      status: 'A enviar',
      orderId: firstOrder.id,
    });
    firstOrder.delivery = delivery;

    firstOrder.date_of_sale = new Date();

    secundaryOrder.date_of_sale = new Date();

    const orders = await listOrderByUseCase.execute({
      isDelivery: 1,
      isSchedule: 0,
      limit: 1,
      page: 1,
    });

    expect(orders.length).toBe(1);
    expect(orders[0].id).toEqual(firstOrder.id);
    expect(orders[0]).toHaveProperty('address');
  });
  test('Deveria retornar os pedidos que estão agendados', async () => {
    const firstOrder = await orderRepository.create({
      code: 'HIJJ',
      discount: 0,
      final_value: 10,
      isDelivery: false,
      full_value: 10,
      additionalPayment: 0,
      isSchedule: true,
      coupon_code: '',
      courtesy_code: '',
      schedule_date: new Date('2023-07-10T10:00:00Z'),
      employer,
    });

    const secundaryOrder = await orderRepository.create({
      code: 'GXWE',
      discount: 0,
      final_value: 10,
      isDelivery: false,
      full_value: 10,
      additionalPayment: 0,
      isSchedule: false,
      coupon_code: '',
      courtesy_code: '',
      schedule_date: new Date(),
      employer,
    });

    firstOrder.date_of_sale = new Date();

    secundaryOrder.date_of_sale = new Date();

    const orders = await listOrderByUseCase.execute({
      isDelivery: 0,
      isSchedule: 1,
      limit: 1,
      page: 1,
    });

    expect(orders.length).toBe(1);
    expect(orders[0].id).toEqual(firstOrder.id);
  });
  test('Deveria retornar os pedidos que são para entrega e estão agendados', async () => {
    const firstOrder = await orderRepository.create({
      code: 'HIJJ',
      discount: 0,
      final_value: 10,
      isDelivery: false,
      full_value: 10,
      additionalPayment: 0,
      isSchedule: false,
      coupon_code: '',
      courtesy_code: '',
      schedule_date: new Date('2023-07-10T10:00:00Z'),
      employer,
    });
    firstOrder.date_of_sale = new Date();

    const secundaryOrder = await orderRepository.create({
      code: 'GXWE',
      discount: 0,
      final_value: 10,
      isDelivery: true,
      full_value: 10,
      additionalPayment: 0,
      isSchedule: true,
      coupon_code: '',
      courtesy_code: '',
      schedule_date: new Date(),
      employer,
    });

    const delivery = new Delivery();
    Object.assign(delivery, {
      adress: '',
      send: false,
      status: 'A enviar',
      orderId: secundaryOrder.id,
    });
    secundaryOrder.date_of_sale = new Date();
    secundaryOrder.delivery = delivery;

    const orders = await listOrderByUseCase.execute({
      isDelivery: 1,
      isSchedule: 1,
      limit: 1,
      page: 1,
    });

    expect(orders.length).toBe(1);
    expect(orders[0].id).toEqual(secundaryOrder.id);
  });
});
