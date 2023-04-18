import database from 'src/database';
import { Repository } from 'typeorm';

import { Delivery } from '@modules/orders/entities/Delivery';

import { IDeliveryDTO, IDeliveryRepository } from '../IDeliveryRepository';

class DeliveryRepository implements IDeliveryRepository {
  private readonly repository: Repository<Delivery>;

  constructor() {
    this.repository = database.getRepository(Delivery);
  }
  async getOrderDelivery(id: string): Promise<Delivery | null> {
    const orderDelivery = await this.repository.findOne({
      where: {
        orderId: id,
      },
    });

    return orderDelivery;
  }

  async create({ adress, order }: IDeliveryDTO): Promise<void> {
    const delivery = this.repository.create({ adress, order });
    await this.repository.save(delivery);
  }
}

export { DeliveryRepository };
