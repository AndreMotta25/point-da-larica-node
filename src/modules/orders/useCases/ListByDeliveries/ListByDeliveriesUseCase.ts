import { inject, injectable } from 'tsyringe';

import AppError from '@errors/AppError';
import { Delivery } from '@modules/orders/entities/Delivery';
import { IDeliveryRepository } from '@modules/orders/repositories/IDeliveryRepository';
import { IOrderRepository } from '@modules/orders/repositories/IOrderRepository';

import { IDeliveriesResponseDTO } from './IDeliveriesResponseDTO';

@injectable()
class ListByDeliveriesUseCase {
  private readonly repository: IOrderRepository;
  private readonly delivery: IDeliveryRepository;

  constructor(
    @inject('OrderRepository') repository: IOrderRepository,
    @inject('DeliveryRepository') delivery: IDeliveryRepository
  ) {
    this.repository = repository;
    this.delivery = delivery;
  }

  async execute(date?: string) {
    if (date && Number.isNaN(new Date(`${date}T00:00`).getTime())) {
      throw new AppError('Formato de data invalido', 400);
    }

    const orders = await this.repository.getOrders();

    const ordersFiltered = await Promise.all(
      orders
        .filter(
          (order) =>
            order.isDelivery === true &&
            ((date &&
              new Date(order.data_of_sale).toLocaleDateString() ===
                new Date(`${date}T00:00`).toLocaleDateString()) ||
              order.data_of_sale.toLocaleDateString() ===
                new Date().toLocaleDateString())
        )
        .map(async (order) => {
          const deliveryInformation = (await this.delivery.getOrderDelivery(
            order.id
          )) as Delivery;

          const orderDTO: IDeliveriesResponseDTO = {
            id: order.id,
            date_of_sale: order.data_of_sale,
            full_value: Number(order.full_value),
            situation: order.canceled ? 'cancelado' : 'ativo',
            deliveryInformationId: deliveryInformation.id,
            discounted_value: Number(order.discounted_value),
          };
          return orderDTO;
        })
    );
    return ordersFiltered;
  }
}

export { ListByDeliveriesUseCase };
