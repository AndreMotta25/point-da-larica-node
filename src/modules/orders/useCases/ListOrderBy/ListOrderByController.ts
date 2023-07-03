import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListOrderByUseCase } from './ListOrderByUseCase';

class ListOrderByController {
  async handler(request: Request, response: Response) {
    const { date, minDate, maxDate, limit, page, isDelivery, isSchedule } =
      request.query;

    const dates = {
      specificDate: date as string,
      minDate: minDate as string,
      maxDate: maxDate as string,
      limit: Number(limit),
      page: Number(page),
    };

    const listByUseCase = container.resolve(ListOrderByUseCase);
    const orders = await listByUseCase.execute({
      date: dates.specificDate,
      minDate: dates.minDate,
      maxDate: dates.maxDate,
      limit: dates.limit,
      page: dates.page,
      isDelivery: isDelivery === undefined ? null : Number(isDelivery),
      isSchedule: isSchedule === undefined ? null : Number(isSchedule),
    });

    return response.status(200).json(orders);
  }
}

export { ListOrderByController };
