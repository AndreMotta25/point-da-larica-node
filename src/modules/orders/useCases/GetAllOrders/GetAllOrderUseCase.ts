import { inject, injectable } from 'tsyringe';

import { IOrderRepository } from '@modules/orders/repositories/IOrderRepository';

import { IGetAllOrders } from '../dtos/Request/IGetAllOrder';
import { IGetAllOrdersResponse } from '../dtos/Response/IGetAllOrdersResponse';

@injectable()
class GetAllOrderUseCase {
  constructor(
    @inject('OrderRepository') private orderRepository: IOrderRepository
  ) {}

  async execute({
    limit,
    page,
  }: IGetAllOrders): Promise<IGetAllOrdersResponse[]> {
    const orders = await this.orderRepository.getOrders({ limit, page });

    const ordersTransformed = orders.map((order) => {
      const orderDTO: IGetAllOrdersResponse = {
        id: order.id,
        code: order.code,
        date_of_sale: order.date_of_sale,
        full_value: order.full_value,
        final_value: order.final_value,
        isDelivery: order.isDelivery,
        situation: order.canceled ? 'cancelado' : 'ativo',
        isSchedule: order.isSchedule,
        schedule_date: order.isSchedule ? order.schedule_date : null,
      };
      return orderDTO;
    });
    return ordersTransformed;
  }
}

export { GetAllOrderUseCase };
