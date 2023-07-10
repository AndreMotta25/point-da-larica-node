import { Delivery } from '@modules/orders/entities/Delivery';

import { IDeliveryDTO, IDeliveryRepository } from '../IDeliveryRepository';

class DeliveryRepositoryInMemory implements IDeliveryRepository {
  private repository: Delivery[];
  constructor() {
    this.repository = [];
  }

  async create({ adress, order }: IDeliveryDTO): Promise<void> {
    const delivery = new Delivery();
    Object.assign(delivery, {
      adress,
      orderId: order.id,
      send: false,
      status: 'A enviar',
    });
    this.repository.push(delivery);
  }
  async getOrderDelivery(id: string): Promise<Delivery | null> {
    return this.repository.find((delivery) => delivery.orderId === id) || null;
  }

  async save(delivery: Delivery): Promise<Delivery> {
    const deliver = this.repository.find(
      (d) => d.id === delivery.id
    ) as Delivery;

    Object.assign(deliver, { ...delivery });

    return deliver;
  }
}
export { DeliveryRepositoryInMemory };
