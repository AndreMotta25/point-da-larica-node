import { inject, injectable } from 'tsyringe';

import { IOrderRepository } from '@modules/orders/repositories/IOrderRepository';

import { IListOrderByDateRequest } from '../dtos/Request/IListOrderByDateRequest';
import { IListOrderByDateResponse } from '../dtos/Response/IListOrderByDateResponse';

@injectable()
class ListOrderByDateUseCase {
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
  }: IListOrderByDateRequest) {
    const orders = await this.repository.getOrderByDate({
      date,
      minDate,
      maxDate,
      limit,
      page,
    });
    const ordersDTO = orders.map((order) => {
      const orderDTO: IListOrderByDateResponse = {
        id: order.id,
        date_of_sale: order.data_of_sale,
        full_value: Number(order.full_value),
        situation: order.canceled ? 'cancelado' : 'ativo',
        discount_price: Number(order.discount_price),
        isDelivery: order.isDelivery,
        code: order.code,
      };
      return orderDTO;
    });
    return ordersDTO;
  }
}

export { ListOrderByDateUseCase };
