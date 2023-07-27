import database from 'src/database';
import { IQueryRunner } from 'src/database/transactions/QueryRunner/IQueryRunner';
import { inject, injectable } from 'tsyringe';
import { Repository } from 'typeorm';

import { Delivery } from '@modules/orders/entities/Delivery';

import { IDeliveryDTO, IDeliveryRepository } from '../IDeliveryRepository';

@injectable()
class DeliveryRepository implements IDeliveryRepository {
  private readonly repository: Repository<Delivery>;
  private queryRunner: IQueryRunner;

  constructor(@inject('QueryRunner') runner: IQueryRunner) {
    this.repository = database.getRepository(Delivery);
    this.queryRunner = runner;
  }
  async save(delivery: Delivery): Promise<Delivery> {
    const deliveryUpdate = await this.repository.save(delivery);

    return deliveryUpdate;
  }
  async getOrderDelivery(id: string): Promise<Delivery | null> {
    const orderDelivery = await this.repository.findOne({
      where: {
        orderId: id,
      },
    });

    return orderDelivery;
  }

  async create({ address, order }: IDeliveryDTO): Promise<void> {
    const runnerRepository = this.queryRunner.getRepository(Delivery);

    const delivery = runnerRepository.create({ address, order });

    await runnerRepository.save(delivery);
  }
}

export { DeliveryRepository };
