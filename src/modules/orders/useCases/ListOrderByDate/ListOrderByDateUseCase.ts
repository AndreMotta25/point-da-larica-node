import { inject, injectable } from 'tsyringe';

import { IOrderRepository } from '@modules/orders/repositories/IOrderRepository';

interface IListOrderDTO {
  date: string;
  minDate: string;
  maxDate: string;
}

@injectable()
class ListOrderByDateUseCase {
  private readonly repository: IOrderRepository;

  constructor(@inject('OrderRepository') repository: IOrderRepository) {
    this.repository = repository;
  }
  async execute({ date, minDate, maxDate }: IListOrderDTO) {
    const orders = await this.repository.getDate();

    const ordersByDates = orders.filter(
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
    );

    return ordersByDates;
  }
}

export { ListOrderByDateUseCase };
