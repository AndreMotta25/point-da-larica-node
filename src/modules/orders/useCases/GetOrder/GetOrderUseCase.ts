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
          total: item.total,
          amount: item.amount,
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
      full_value: order.full_value,
      coupon_code: order.coupon_code,
      date_of_sale: order.date_of_sale,
      isDelivery: order.isDelivery,
      delivery: order.isDelivery ? delivery : undefined,
      discount: order.discount,
      final_value: order.final_value,
      situation: order.canceled ? 'cancelado' : 'ativo',
      itens,
      additionalPayment: order.additionalPayment,
    };
  }
}

export { GetOrderUseCase };
