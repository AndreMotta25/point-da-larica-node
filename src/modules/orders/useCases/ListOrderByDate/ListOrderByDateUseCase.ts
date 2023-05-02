import { pagination } from 'src/utils/pagination';
import { inject, injectable } from 'tsyringe';

import { IOrderRepository } from '@modules/orders/repositories/IOrderRepository';

import { IOrderResponseDTO } from './IOrderResponseDTO';

export interface IListOrderDTO {
  date?: string;
  minDate?: string;
  maxDate?: string;
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
    const orders = this.repository.getOrderByDate({
      date,
      minDate,
      maxDate,
      limit,
      page,
    });

    return orders;
  }
}

export { ListOrderByDateUseCase };
