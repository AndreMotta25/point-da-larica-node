import { inject, injectable } from 'tsyringe';

import AppError from '@errors/AppError';
import { Order } from '@modules/orders/entities/Order';
import { IOrderRepository } from '@modules/orders/repositories/IOrderRepository';

import { ICreateOrderResponse } from '../dtos/Response/ICreateOrderResponse';

interface IRequestPayment {
  id: string;
  value: number;
}

@injectable()
class AdditionalPaymentUseCase {
  constructor(
    @inject('OrderRepository') private orderRepository: IOrderRepository
  ) {}

  async execute({ id, value }: IRequestPayment): Promise<ICreateOrderResponse> {
    const order = (await this.orderRepository.getOrder(id)) as Order;

    if (!order) throw new AppError('Pedido não encontrado');

    console.log(value);
    order.final_value = Number(order.final_value) + Number(value);
    order.full_value = Number(order.full_value) + Number(value);

    order.additionalPayment = Number(value);

    await this.orderRepository.create(order);
    return {
      finalized: true,
      remaining_balance: 0,
      id_order: id,
      code: order?.code,
    };
  }
}

export { AdditionalPaymentUseCase };
