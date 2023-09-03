import { container, injectable } from 'tsyringe';

import { CreateOrderUseCase } from '../CreateOrder/CreateOrderUseCase';
import { ICreateOrderScheduleRequest } from '../dtos/Request/ICreateOrderScheduleRequest';

@injectable()
class ScheduleOrderUseCase {
  private createOrderUseCase: CreateOrderUseCase;
  constructor() {
    this.createOrderUseCase = container.resolve(CreateOrderUseCase);
  }
  // aqui vamos usar o useCase de criar um pedido
  async execute(data: ICreateOrderScheduleRequest) {
    const order = await this.createOrderUseCase.execute({
      ...data,
      isSchedule: true,
      address: data.address,
      employer: data.employer,
    });

    return order;
  }
}

export { ScheduleOrderUseCase };
