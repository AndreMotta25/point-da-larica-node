import { dateToString } from 'src/utils/dateToString';
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

export interface IGetSalesOfWeekResponse {
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

    // ==============================================

    const diffInDays = Math.ceil(
      Math.abs(max.getTime() - min.getTime()) / (1000 * 60 * 60 * 24)
    );

    const daysOfWeek: string[] = [dateToString(max)]; // It will start with the biggest date

    // eslint-disable-next-line no-plusplus
    for (let lessDay = diffInDays; lessDay > 0; lessDay--) {
      const date = new Date(
        new Date(max).setDate(new Date(max).getDate() - lessDay)
      );

      daysOfWeek.push(`${dateToString(date)}`);
    }

    const saleDates = data.map((d) => dateToString(d.date_trunc));

    const emptyDates: string[] = [];

    Object.entries(daysOfWeek).forEach((d) => {
      if (!saleDates.includes(d[1])) emptyDates.push(d[1]);
    });

    const fakeDates: ISalesOfWeek[] = [];

    emptyDates.forEach((date) => {
      const sale = {
        date_trunc: new Date(`${date}Z`),
        sum: 0,
        count: 0,
      };
      fakeDates.push(sale);
    });
    console.log(fakeDates);

    data.push(...fakeDates);

    // ==============================================
    return data.reduce((acc: IGetSalesOfWeekResponse[], groupData) => {
      return [...acc, { ...groupData, day: groupData.date_trunc.getUTCDay() }];
    }, []);
  }
}

export { SalesOfWeekUseCase };
