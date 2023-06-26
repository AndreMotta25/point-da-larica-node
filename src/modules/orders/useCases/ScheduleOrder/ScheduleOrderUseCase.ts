import { container, injectable } from 'tsyringe';

import { CreateOrderUseCase } from '../CreateOrder/CreateOrderUseCase';
import { ICreateOrderRequest } from '../dtos/Request/ICreateOrderRequest';

@injectable()
class ScheduleOrderUseCase {
  private createOrderUseCase: CreateOrderUseCase;
  constructor() {
    this.createOrderUseCase = container.resolve(CreateOrderUseCase);
  }
  // aqui vamos usar o useCase de criar um pedido
  async execute({
    coupon_code,
    itens,
    isDelivery,
    adress,
    schedule_date,
  }: ICreateOrderRequest) {
    const order = await this.createOrderUseCase.execute({
      schedule: true,
      coupon_code,
      itens,
      isDelivery,
      adress,
      schedule_date,
    });

    return order;
  }
}

export { ScheduleOrderUseCase };
