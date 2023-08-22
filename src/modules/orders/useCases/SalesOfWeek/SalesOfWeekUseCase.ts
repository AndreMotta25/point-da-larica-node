import { inject, injectable } from 'tsyringe';

import { IOrderRepository } from '@modules/orders/repositories/IOrderRepository';
import { dateToString } from '@utils/dateToString';
import { diffInDays as diff } from '@utils/diffInDays';
import { utcDateToLocalDate } from '@utils/utcToLocalDate';

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
  dayOfMonth: number;
  dayOfWeek: string;
}

const daysOfWeek = [
  'Domingo',
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sabado',
];
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

    const diffInDays = diff(max, min);

    const dates: string[] = [];
    const currentDay = max.getDate(); // pega o dia do horario local.

    // eslint-disable-next-line no-plusplus
    for (let lessDay = diffInDays; lessDay > 0; lessDay--) {
      /*
        Preciso que seja no horario local, pq se o horario for 2023-08-20 as 23:00:00 o node colocará para 2023-08-21T02:00:00. 
        Essa parte tem quer em horario local, pq o que vem do banco está mapeado pelo horario local
      */
      const date = utcDateToLocalDate(
        new Date(new Date(max).setDate(currentDay - lessDay))
      );
      dates.push(`${dateToString(date)}`);
    }

    dates.push(`${dateToString(utcDateToLocalDate(max))}`);

    const saleDates = data.map((d) => dateToString(d.date_trunc));
    const emptyDates = dates.filter((sale) => !saleDates.includes(sale));
    const mockDates = emptyDates.map((date) => {
      return {
        date_trunc: new Date(`${date}T00:00:00Z`),
        sum: 0,
        count: 0,
      };
    });

    data.push(...mockDates);

    /*
      Como todos os horarios foram setados para meia-noite se usarmos o getDay(), vamos ter o horario local que será as 21:00 horas no horario
      de brasilia que é um dia anterior. então se o horario é 2023-08-12:T00:00:00 ao usar o getDate iria para 2023-08-11:T21:00:00
    */
    return data
      .reduce((acc: IGetSalesOfWeekResponse[], groupData) => {
        return [
          ...acc,
          {
            ...groupData,
            day: groupData.date_trunc.getUTCDay(),
            dayOfWeek: daysOfWeek[groupData.date_trunc.getUTCDay()],
            dayOfMonth: groupData.date_trunc.getUTCDate(),
          },
        ];
      }, [])
      .sort((a, b) => a.dayOfMonth - b.dayOfMonth);
  }
}

export { SalesOfWeekUseCase };
