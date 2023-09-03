import { inject, injectable } from 'tsyringe';

import { IOrderRepository } from '@modules/orders/repositories/IOrderRepository';

import { IListOrderByRequest } from '../dtos/Request/IListOrderByRequest';
import { IListOrderByResponse } from '../dtos/Response/IListOrderByDateResponse';

@injectable()
class ListOrderByUseCase {
  private readonly repository: IOrderRepository;

  constructor(@inject('OrderRepository') repository: IOrderRepository) {
    this.repository = repository;
  }

  async execute({
    date,
    minDate,
    maxDate,
    limit,
    page,
    isDelivery,
    isSchedule,
  }: IListOrderByRequest) {
    const orders = await this.repository.getOrderBy({
      date,
      minDate,
      maxDate,
      limit,
      page,
      delivery: isDelivery === null ? null : Boolean(isDelivery),
      isSchedule: isSchedule === null ? null : Boolean(isSchedule),
    });
    const ordersDTO = orders.map((order) => {
      const orderDTO: IListOrderByResponse = {
        id: order.id,
        date_of_sale: order.date_of_sale,
        full_value: Number(order.full_value),
        situation: order.canceled ? 'cancelado' : 'ativo',
        final_value: Number(order.final_value),
        isDelivery: order.isDelivery,
        code: order.code,
        address: order.delivery?.address || null,
        deliveryInformationId: order.delivery?.id || null,
        send: order.delivery?.send !== undefined ? order.delivery.send : null,
        isSchedule: order.isSchedule,
        schedule_date: isSchedule ? order.schedule_date : null,
      };
      return orderDTO;
    });
    return ordersDTO;
  }
}

export { ListOrderByUseCase };
