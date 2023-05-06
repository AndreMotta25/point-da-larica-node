import { Between, Repository } from 'typeorm';

import { Order } from '@modules/orders/entities/Order';
import { IListOrderDTO } from '@modules/orders/useCases/ListOrderByDate/ListOrderByDateUseCase';

import database from '../../../../database';
import {
  IOrderRepository,
  IRequestOrder,
  IRequestOrderDelivery,
} from '../IOrderRepository';

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

  async getOrderToDelivery({ date, page, limit }: IRequestOrderDelivery) {
    const orders = this.repository
      .createQueryBuilder('orders')
      .leftJoinAndSelect('orders.delivery', 'delivery')
      .where('orders.isDelivery = :delivery', { delivery: true });

    if (date) {
      orders.andWhere("DATE_TRUNC('day', data_of_sale) = :date", {
        date: new Date(date),
      });
    } else {
      orders.andWhere("DATE_TRUNC('day', data_of_sale) = :date", {
        date: new Date().toLocaleDateString().split('-').reverse().join('-'),
      });
    }

    return orders
      .skip(limit * (page - 1))
      .take(limit)
      .getMany();
  }

  async getOrderByDate({ minDate, maxDate, date, limit, page }: IListOrderDTO) {
    if (date) {
      const orders = await this.repository
        .createQueryBuilder('orders')
        .where("DATE_TRUNC('day', data_of_sale) = :date", { date })
        .skip(limit * (page - 1))
        .take(limit)
        .getMany();
      return orders;
    }
    if (minDate && maxDate) {
      const [orders] = await this.repository.findAndCount({
        where: {
          data_of_sale: Between(
            new Date(`${minDate}T00:00`),
            new Date(`${maxDate}T23:59`)
          ),
        },
        skip: limit * (page - 1),
        take: limit,
      });
      return orders;
    }

    const [orders] = await this.repository.findAndCount({
      skip: limit * (page - 1),
      take: limit,
    });

    return orders;
  }
}

export { OrderRepository };
