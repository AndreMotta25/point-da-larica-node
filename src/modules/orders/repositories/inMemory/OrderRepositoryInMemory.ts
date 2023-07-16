/* eslint-disable no-else-return */
import { Order } from '@modules/orders/entities/Order';

import { dateToString } from '../../../../utils/dateToString';
import { utcToLocal } from '../../../../utils/utcToLocal';
import {
  IGetOrderBy,
  IGetSalesOfWeek,
} from '../implementations/OrderRepository';
import { IOrderRepository, IRequestOrder } from '../IOrderRepository';

class OrderRepositoryInMemory implements IOrderRepository {
  private orders: Order[];

  constructor() {
    this.orders = [];
  }
  async getOrderBy(data: IGetOrderBy): Promise<Order[]> {
    // eslint-disable-next-line prettier/prettier
    let orders: Order[]

    if (data.date) {
      orders = this.orders.filter(
        (order) => order.date_of_sale.toLocaleDateString() === data.date
      );
    } else if (data.minDate && data.maxDate) {
      orders = this.orders.filter((order) => {
        const date = new Date(
          `${
            utcToLocal(order.date_of_sale, {
              locale: 'pt-BR',
              config: { timeZone: process.env.TZ },
            }).split('T')[0]
          }T00:00:00Z`
        );
        if (
          date >= new Date(`${data.minDate}T00:00:00Z`) &&
          date <= new Date(`${data.maxDate}T00:00:00Z`)
        ) {
          return order;
        }
        return false;
      });
    } else {
      orders = this.orders.filter(
        (order) =>
          order.date_of_sale.toLocaleDateString() ===
          new Date().toLocaleDateString()
      );
    }
    if (data.delivery) {
      orders = orders.filter((order) => order.isDelivery === data.delivery);
    }
    if (data.isSchedule) {
      orders = orders.filter((order) => order.isSchedule === data.isSchedule);
    }

    return orders;
  }

  getSalesOfWeek({ minDate, maxDate }: IGetSalesOfWeek): Promise<any> {
    throw new Error('Method not implemented.');
  }

  async create(data: IRequestOrder): Promise<Order> {
    let order: Order;

    if (data.id) {
      order = this.orders.find((elem) => elem.id === data.id) as Order;
      Object.assign(order, { ...data });
    } else {
      order = new Order();
      Object.assign(order, { ...data });
      this.orders.push(order);
    }

    return order;
  }

  async getOrders(): Promise<Order[]> {
    return this.orders;
  }
  async getOrder(id: string): Promise<Order | null> {
    const order = this.orders.find((order) => order.id === id);
    return order || null;
  }
}

export { OrderRepositoryInMemory };

// acredito que o timezone que está aqui é utc e o do quoka é o local
