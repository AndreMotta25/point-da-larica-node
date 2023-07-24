import { inject, injectable } from 'tsyringe';

import { IOrderRepository } from '@modules/orders/repositories/IOrderRepository';

import { IListOrderByRequest } from '../dtos/Request/IListOrderByRequest';
import { IDeliveryResponse } from '../dtos/Response/IDeliveryResponse';
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
    if (isDelivery) {
      const ordersDTO = orders.map((order) => {
        const orderDTO: IDeliveryResponse = {
          id: order.id,
          date_of_sale: order.date_of_sale,
          full_value: Number(order.full_value),
          situation: order.canceled ? 'cancelado' : 'ativo',
          deliveryInformationId: order.delivery.id,
          discounted_price: Number(order.final_value),
          send: order.delivery.send,
          address: order.delivery.adress,
          code: order.code,
        };
        return orderDTO;
      });
      return ordersDTO;
    }

    const ordersDTO = orders.map((order) => {
      const orderDTO: IListOrderByResponse = {
        id: order.id,
        date_of_sale: order.date_of_sale,
        full_value: Number(order.full_value),
        situation: order.canceled ? 'cancelado' : 'ativo',
        final_value: Number(order.final_value),
        isDelivery: order.isDelivery,
        code: order.code,
      };
      return orderDTO;
    });
    return ordersDTO;
  }
}

export { ListOrderByUseCase };
