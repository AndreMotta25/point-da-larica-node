/* eslint-disable @typescript-eslint/no-unused-vars */
import { IQueryRunner } from 'src/database/transactions/QueryRunner/IQueryRunner';
import { dateToString } from 'src/utils/dateToString';
import { utcToLocal } from 'src/utils/utcToLocal';
import { inject, injectable } from 'tsyringe';
import { Raw, Repository } from 'typeorm';

import { Order } from '@modules/orders/entities/Order';
import { IGetAllOrders } from '@modules/orders/useCases/dtos/Request/IGetAllOrder';
import { IGetSalesOfWeek } from '@modules/orders/useCases/dtos/Request/IGetSalesOfWeek';

import database from '../../../../database';
import { IOrderRepository, IRequestOrder } from '../IOrderRepository';

export interface IGetOrderBy {
  date?: string;
  minDate?: string;
  maxDate?: string;
  limit: number;
  page: number;
  delivery: boolean | null;
  schedule: boolean | null;
}

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

  async getOrderBy({
    minDate,
    maxDate,
    date,
    limit,
    page,
    delivery,
    schedule = false,
  }: IGetOrderBy) {
    const limitItens = limit || 5;
    const pageNumber = page || 1;
    const orders = this.repository.createQueryBuilder('orders');

    if (date) {
      orders.where(
        `DATE_TRUNC('day', date_of_sale AT TIME ZONE '${process.env.TZ}' ) = :date`,
        { date: new Date(`${date}T00:00:00`) }
      );
    }
    // retorna entre duas datas
    else if (minDate && maxDate) {
      orders.where(
        `date_of_sale AT TIME ZONE '${process.env.TZ}' BETWEEN '${minDate}T00:00' AND '${maxDate}T23:59'`
      );
    }
    // retorna os pedidos do dia
    else {
      const date = utcToLocal(new Date(), {
        locale: 'pt-BR',
        config: { timeZone: process.env.TZ },
      }).split('T')[0];

      orders.where(
        `DATE_TRUNC('day', date_of_sale AT TIME ZONE '${process.env.TZ}' ) = :date`,
        {
          date: `${date}`,
        }
      );
    }
    // vai buscar os pedidos que são para entrega
    if (delivery !== null && delivery !== undefined) {
      orders
        .leftJoinAndSelect('orders.delivery', 'delivery')
        .andWhere('orders.isDelivery = :delivery', {
          delivery: !!delivery,
        });
    }
    if (schedule !== null && schedule !== undefined) {
      orders.andWhere('orders.schedule = :schedule', { schedule: !!schedule });
    }

    const teste = await orders
      .skip(limitItens * (pageNumber - 1))
      .take(limitItens)
      .getMany();

    return teste;
  }

  async getSalesOfWeek({ minDate, maxDate }: IGetSalesOfWeek) {
    const orders = this.repository.createQueryBuilder('orders');
    orders
      .select("DATE_TRUNC('day',date_of_sale)")
      .addSelect('sum(final_value)', 'sum')
      .addSelect('count(*)')
      .where(
        `date_of_sale AT TIME ZONE '${process.env.TZ}' BETWEEN '${dateToString(
          minDate
        )}T00:00:00' AND '${dateToString(maxDate)}T23:59:00'`
      )
      .groupBy("DATE_TRUNC('day',date_of_sale)");

    return orders.getRawMany();
  }
}

export { OrderRepository, IGetSalesOfWeek };
