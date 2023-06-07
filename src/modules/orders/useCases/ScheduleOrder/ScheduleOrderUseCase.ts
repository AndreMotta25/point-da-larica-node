import { container, injectable } from 'tsyringe';

import ErrorField from '@errors/ErrorField';

import { CreateOrderUseCase } from '../CreateOrder/CreateOrderUseCase';
import { ICreateOrderRequest } from '../dtos/shared/ICreateOrderRequest';

interface IOrderRequestDTO extends ICreateOrderRequest {
  schedule_date: string;
}

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
  }: IOrderRequestDTO) {
    // isso talvez vá para o express;
    if (!schedule_date)
      throw new ErrorField(
        schedule_date,
        'A data do agendamento não pode ficar vazia',
        'schedule_date',
        400
      );

    await this.createOrderUseCase.execute({
      schedule: true,
      coupon_code,
      itens,
      isDelivery,
      adress,
      schedule_date: new Date(schedule_date),
    });
  }
}

export { ScheduleOrderUseCase };
