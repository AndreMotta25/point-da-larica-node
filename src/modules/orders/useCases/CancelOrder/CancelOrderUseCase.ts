import { inject, injectable } from 'tsyringe';

import AppError from '@errors/AppError';
import { IOrderRepository } from '@modules/orders/repositories/IOrderRepository';

@injectable()
class CancelOrderUseCase {
  constructor(
    @inject('OrderRepository') private orderRepository: IOrderRepository
  ) {}
  async execute(id_order: string) {
    const order = await this.orderRepository.getOrder(id_order);

    if (!order) throw new AppError('Pedido não achado');

    order.canceled = true;

    const orderCanceled = await this.orderRepository.create(order);
    return orderCanceled;
  }
}

export { CancelOrderUseCase };
