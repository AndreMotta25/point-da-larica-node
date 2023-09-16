import { inject, injectable } from 'tsyringe';

import AppError from '@errors/AppError';
import { IOrderRepository } from '@modules/orders/repositories/IOrderRepository';
import { IProductRepository } from '@modules/orders/repositories/IProductRepository';

import {
  IDelivery,
  IGetOrderResponse,
} from '../dtos/Response/IGetOrderResponse';

@injectable()
class GetOrderUseCase {
  constructor(
    @inject('OrderRepository') private repository: IOrderRepository,
    @inject('ProductRepository') private repositoryProduct: IProductRepository
  ) {}

  async execute(id: string): Promise<IGetOrderResponse> {
    const order = await this.repository.getOrder(id);

    if (!order) throw new AppError('Pedido não achado', 404);

    const itens = await Promise.all(
      order.orderList.map(async (item) => {
        const product = await this.repositoryProduct.findById(item.productId);
        return {
          total: Number(item.total),
          amount: Number(item.amount),
          name: product?.name as string,
        };
      })
    );
    let delivery: IDelivery | undefined;

    if (order.isDelivery) {
      delivery = {
        address: order.delivery.address,
        send: order.delivery.send,
      };
    }

    return {
      id: order.id,
      code: order.code,
      full_value: Number(order.full_value),
      coupon_code: order.coupon_code,
      date_of_sale: order.date_of_sale,
      isDelivery: order.isDelivery,
      delivery: order.isDelivery ? delivery : undefined,
      discount: Number(order.discount),
      final_value: Number(order.final_value),
      situation: order.canceled ? 'cancelado' : 'ativo',
      itens,
      additionalPayment: Number(order.additionalPayment),
      isSchedule: order.isSchedule,
      schedule_date: order.isSchedule ? order.schedule_date : null,
    };
  }
}

export { GetOrderUseCase };
