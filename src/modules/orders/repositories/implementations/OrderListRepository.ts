import { Repository } from 'typeorm';

import { OrderList } from '@modules/orders/entities/OrderList';

import database from '../../../../database';
import { IOrderListDTO, IOrderListRepository } from '../IOrderListRepository';

class OrderListRepository implements IOrderListRepository {
  private readonly repository: Repository<OrderList>;

  constructor() {
    this.repository = database.getRepository(OrderList);
  }
  async create({
    amount,
    order,
    product,
    total,
  }: IOrderListDTO): Promise<void> {
    const orderList = this.repository.create({
      order,
      product,
      amount,
      total,
    });
    await this.repository.save(orderList);
  }
}

export { OrderListRepository };
