import { pagination } from 'src/utils/pagination';
import { inject, injectable } from 'tsyringe';

import { IOrderRepository } from '@modules/orders/repositories/IOrderRepository';

import { IOrderResponseDTO } from './IOrderResponseDTO';

interface IListOrderDTO {
  date: string;
  minDate: string;
  maxDate: string;
  limit: number;
  page: number;
}

@injectable()
class ListOrderByDateUseCase {
  private readonly repository: IOrderRepository;

  constructor(@inject('OrderRepository') repository: IOrderRepository) {
    this.repository = repository;
  }

  async execute({ date, minDate, maxDate, limit, page }: IListOrderDTO) {
    const orders = await this.repository.getOrders();

    const ordersByDates = orders
      .filter(
        (order) =>
          (date &&
            order.data_of_sale.toLocaleDateString() ===
              new Date(`${date}T00:00`).toLocaleDateString()) ||
          (minDate &&
            maxDate &&
            order.data_of_sale.toLocaleDateString() >=
              new Date(`${minDate}T00:00`).toLocaleDateString() &&
            order.data_of_sale.toLocaleDateString() <=
              new Date(`${maxDate}T00:00`).toLocaleDateString()) ||
          (!date && !minDate && !maxDate && order)
      )
      .map((order) => {
        const orderDTO: IOrderResponseDTO = {
          id: order.id,
          date_of_sale: order.data_of_sale,
          full_value: Number(order.full_value),
          situation: order.canceled ? 'cancelado' : 'ativo',
          discounted_value: Number(order.discounted_value),
        };
        return orderDTO;
      });
    if (limit && page)
      return pagination<IOrderResponseDTO>(ordersByDates, limit)[page - 1];

    return ordersByDates;
  }
}

export { ListOrderByDateUseCase };
