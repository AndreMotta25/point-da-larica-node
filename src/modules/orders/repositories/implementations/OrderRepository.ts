import { Repository } from 'typeorm';

import { Order } from '@modules/orders/entities/Order';

import database from '../../../../database';
import { IOrderRepository, IRequestOrder } from '../IOrderRepository';

class OrderRepository implements IOrderRepository {
  private readonly repository: Repository<Order>;

  constructor() {
    this.repository = database.getRepository(Order);
  }
  async getOrder(id: string): Promise<Order | null> {
    const order = await this.repository.findOne({
      relations: {
        orderList: true,
        delivery: true,
      },
      where: {
        id,
      },
    });
    return order;
  }

  async create(order: IRequestOrder): Promise<Order> {
    const newOrder = this.repository.create({ ...order });
    await this.repository.save(newOrder);

    return newOrder;
  }

  async getOrders() {
    const orders = await this.repository.find();
    return orders;
  }
}

export { OrderRepository };
