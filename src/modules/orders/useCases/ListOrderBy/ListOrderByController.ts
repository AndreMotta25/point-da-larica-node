import { Request, Response } from 'express';
import { validator } from 'src/provider/resultValidator/implements/validator';
import { container } from 'tsyringe';

import { ListOrderByUseCase } from './ListOrderByUseCase';

class ListOrderByController {
  async handler(request: Request, response: Response) {
    const { date, minDate, maxDate, limit, page, isDelivery, isSchedule } =
      request.query;
    const result = validator(request);

    if (result.hasErrors())
      return response.status(400).json({ errors: result.getErrors() });

    const listByUseCase = container.resolve(ListOrderByUseCase);

    const orders = await listByUseCase.execute({
      date: date as string,
      minDate: minDate as string,
      maxDate: maxDate as string,
      limit: Number(limit),
      page: Number(page),
      isDelivery: isDelivery === undefined ? null : Number(isDelivery),
      isSchedule: isSchedule === undefined ? null : Number(isSchedule),
    });

    return response.status(200).json(orders);
  }
}

export { ListOrderByController };
