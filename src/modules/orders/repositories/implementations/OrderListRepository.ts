import { IQueryRunner } from 'src/database/transactions/QueryRunner/IQueryRunner';
import { inject, injectable } from 'tsyringe';
import { Repository } from 'typeorm';

import { OrderList } from '@modules/orders/entities/OrderList';

import database from '../../../../database';
import { IOrderListDTO, IOrderListRepository } from '../IOrderListRepository';

@injectable()
class OrderListRepository implements IOrderListRepository {
  private readonly repository: Repository<OrderList>;

  constructor(@inject('QueryRunner') private runner: IQueryRunner) {
    this.repository = database.getRepository(OrderList);
  }
  async create({
    amount,
    order,
    product,
    total,
  }: IOrderListDTO): Promise<void> {
    const runnerRepository = this.runner.getRepository(OrderList);
    const orderList = runnerRepository.create({
      order,
      product,
      amount,
      total,
    });
    await runnerRepository.save(orderList);
  }
}

export { OrderListRepository };
