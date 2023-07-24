import { inject, injectable } from 'tsyringe';

import { IOrderRepository } from '@modules/orders/repositories/IOrderRepository';

export interface ISalesOfWeek {
  date_trunc: Date;
  sum: number;
  count: number;
}
interface IGetSalesOfWeek {
  minDate?: Date;
  maxDate?: Date;
}

interface IGetSalesOfWeekResponse {
  date_trunc: Date;
  sum: number;
  count: number;
  day: number;
}

@injectable()
class SalesOfWeekUseCase {
  constructor(
    @inject('OrderRepository') private orderRepository: IOrderRepository
  ) {}

  async execute({
    minDate,
    maxDate,
  }: IGetSalesOfWeek): Promise<IGetSalesOfWeekResponse[]> {
    let min: Date;
    let max: Date;

    if (!(minDate && maxDate)) {
      max = new Date();
      min = new Date(new Date(max).setDate(new Date(max).getDate() - 7));
    } else {
      max = maxDate;
      min = minDate;
    }

    const data = (await this.orderRepository.getSalesOfWeek({
      minDate: min,
      maxDate: max,
    })) as ISalesOfWeek[];

    return data.reduce((acc: IGetSalesOfWeekResponse[], groupData) => {
      return [...acc, { ...groupData, day: groupData.date_trunc.getUTCDay() }];
    }, []);
  }
}

export { SalesOfWeekUseCase };
