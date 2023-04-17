import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListOrderByDateUseCase } from './ListOrderByDateUseCase';

class ListOrderByDateController {
  async handler(request: Request, response: Response) {
    const { date, minDate, maxDate } = request.query;
    const dates = {
      specificDate: date as string,
      minDate: minDate as string,
      maxDate: maxDate as string,
    };

    const listByDateUseCase = container.resolve(ListOrderByDateUseCase);

    const orders = await listByDateUseCase.execute({
      date: dates.specificDate,
      minDate: dates.minDate,
      maxDate: dates.maxDate,
    });

    return response.status(200).json(orders);
  }
}

export { ListOrderByDateController };
