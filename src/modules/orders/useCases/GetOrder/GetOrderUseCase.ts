import { inject, injectable } from 'tsyringe';

import AppError from '@errors/AppError';
import { IOrderRepository } from '@modules/orders/repositories/IOrderRepository';
import { IProductRepository } from '@modules/orders/repositories/IProductRepository';

interface IItem {
  total: number;
  amount: number;
  name: string;
}

interface IDelivery {
  send: boolean;
  address: string;
}

interface IOrderResponseDTO {
  id: string;
  full_value: number;
  discount_price: number;
  date_of_sale: Date;
  discount: number;
  situation: 'ativo' | 'cancelado';
  coupon_code: string;
  delivery?: IDelivery;
  itens: IItem[];
  isDelivery: boolean;
}

@injectable()
class GetOrderUseCase {
  constructor(
    @inject('OrderRepository') private repository: IOrderRepository,
    @inject('ProductRepository') private repositoryProduct: IProductRepository
  ) {}

  async execute(id: string): Promise<IOrderResponseDTO> {
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
        address: order.delivery.adress,
        send: order.delivery.send,
      };
    }

    return {
      id: order.id,
      full_value: order.full_value,
      coupon_code: order.coupon_code,
      date_of_sale: order.data_of_sale,
      isDelivery: order.isDelivery,
      delivery: order.isDelivery ? delivery : undefined,
      discount: order.discount,
      discount_price: order.discount_price,
      situation: order.canceled ? 'cancelado' : 'ativo',
      itens,
    };
  }
}

export { GetOrderUseCase };
