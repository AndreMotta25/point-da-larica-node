import { inject, injectable } from 'tsyringe';

import AppError from '@errors/AppError';
import { IDeliveryRepository } from '@modules/orders/repositories/IDeliveryRepository';

@injectable()
class SendOrderUseCase {
  constructor(
    @inject('DeliveryRepository') private repository: IDeliveryRepository
  ) {}

  async execute(id: string) {
    const delivery = await this.repository.getOrderDelivery(id);

    if (!delivery) throw new AppError('Pedido não achado', 404);

    delivery.send = true;

    await this.repository.save(delivery);

    return delivery;
  }
}
export { SendOrderUseCase };
