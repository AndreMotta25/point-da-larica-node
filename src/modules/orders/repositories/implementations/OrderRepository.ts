import { IQueryRunner } from 'src/database/transactions/QueryRunner/IQueryRunner';
import { inject, injectable } from 'tsyringe';
import { Raw, Repository } from 'typeorm';

import { Order } from '@modules/orders/entities/Order';
import { IGetAllOrders } from '@modules/orders/useCases/dtos/Request/IGetAllOrder';
import { IListOrderByDateRequest } from '@modules/orders/useCases/dtos/Request/IListOrderByDateRequest';
import { IOrderDeliveryRequest } from '@modules/orders/useCases/dtos/Request/IOrderDeliveryRequest';

import database from '../../../../database';
import { IOrderRepository, IRequestOrder } from '../IOrderRepository';

@injectable()
class OrderRepository implements IOrderRepository {
  private readonly repository: Repository<Order>;
  private queryRunner: IQueryRunner;

  constructor(@inject('QueryRunner') runner: IQueryRunner) {
    this.repository = database.getRepository(Order); // pode ser um queryRunner eu acho
    this.queryRunner = runner;
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
    const runnerRepository = this.queryRunner.getRepository(Order);

    const newOrder = runnerRepository.create({ ...order });

    await runnerRepository.save(newOrder);
    return newOrder;
  }

  async getOrders({ limit, page }: IGetAllOrders) {
    const limitItens = limit || 5;
    const pageNumber = page || 1;

    const orders = await this.repository.find({
      order: { date_of_sale: 'DESC' },
      take: limitItens,
      skip: limitItens * (pageNumber - 1),
    });
    return orders;
  }

  async getOrderToDelivery({ date, page, limit }: IOrderDeliveryRequest) {
    const orders = this.repository
      .createQueryBuilder('orders')
      .leftJoinAndSelect('orders.delivery', 'delivery')
      .where('orders.isDelivery = :delivery', { delivery: true });

    if (date) {
      orders.andWhere(
        `DATE_TRUNC('day', date_of_sale AT TIME ZONE '${process.env.TZ}' ) = :date`,
        {
          date: new Date(date),
        }
      );
    } else {
      orders.andWhere(
        `DATE_TRUNC('day', date_of_sale AT TIME ZONE '${process.env.TZ}' ) = :date`,
        {
          date: new Date().toLocaleDateString().split('-').reverse().join('-'),
        }
      );
    }

    return orders
      .skip(limit * (page - 1))
      .take(limit)
      .getMany();
  }

  async getOrderByDate({
    minDate,
    maxDate,
    date,
    limit,
    page,
  }: IListOrderByDateRequest) {
    const limitItens = limit || 5;
    const pageNumber = page || 1;

    if (date) {
      const orders = await this.repository.find({
        where: {
          date_of_sale: Raw(
            (alias) =>
              `DATE_TRUNC('day', ${alias} AT TIME ZONE '${process.env.TZ}') = :date`,
            { date }
          ),
        },
        skip: limitItens * (pageNumber - 1),
        take: limitItens,
      });

      return orders;
    }
    if (minDate && maxDate) {
      const orders = await this.repository.find({
        where: {
          date_of_sale: Raw(
            (alias) =>
              `${alias} AT TIME ZONE '${process.env.TZ}' BETWEEN '${minDate}T00:00' AND '${maxDate}T23:59'`
          ),
        },
      });
      return orders;
    }

    // retorna os pedidos do dia
    const datePoint = new Date();

    const dateNow = `${datePoint.getFullYear()}-${
      datePoint.getMonth() + 1
    }-${datePoint.getDate()}`;

    const orders = await this.repository.find({
      where: {
        date_of_sale: Raw(
          (alias) =>
            `DATE_TRUNC('day', ${alias} AT TIME ZONE '${process.env.TZ}') = '${dateNow}'`
        ),
      },
    });

    return orders;
  }
}

export { OrderRepository };
