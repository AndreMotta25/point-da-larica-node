import { inject, injectable } from 'tsyringe';

import AppError from '@errors/AppError';
import {
  IOrderRepository,
  IRequestOrderDelivery,
} from '@modules/orders/repositories/IOrderRepository';

import { IDeliveriesResponseDTO } from './IDeliveriesResponseDTO';

@injectable()
class ListByDeliveriesUseCase {
  private readonly repository: IOrderRepository;

  constructor(@inject('OrderRepository') repository: IOrderRepository) {
    this.repository = repository;
  }

  async execute({ date, limit, page }: IRequestOrderDelivery) {
    if (date && Number.isNaN(new Date(`${date}T00:00`).getTime())) {
      throw new AppError('Formato de data invalido', 400);
    }

    const ordersFiltered = await this.repository.getOrderToDelivery({
      date,
      limit: limit || 5,
      page: page || 1,
    });

    const ordersDTOs = ordersFiltered.map((order) => {
      const orderDTO: IDeliveriesResponseDTO = {
        id: order.id,
        date_of_sale: order.data_of_sale,
        full_value: Number(order.full_value),
        situation: order.canceled ? 'cancelado' : 'ativo',
        deliveryInformationId: order.delivery.id,
        discounted_value: Number(order.discounted_value),
        send: order.delivery.send,
        address: order.delivery.adress,
      };
      return orderDTO;
    });
    return ordersDTOs;
  }
}

export { ListByDeliveriesUseCase };
