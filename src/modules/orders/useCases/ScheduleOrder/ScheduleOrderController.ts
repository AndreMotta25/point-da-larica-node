import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { container } from 'tsyringe';

import { ScheduleOrderUseCase } from './ScheduleOrderUseCase';

class ScheduleOrderController {
  async handler(request: Request, response: Response) {
    const errors = validationResult(request);

    if (!errors.isEmpty())
      return response.status(400).json({ errors: errors.array() });

    const { itens, coupon_code, isDelivery, adress, schedule_date } =
      request.body;

    const scheduleOrderUseCase = container.resolve(ScheduleOrderUseCase);

    await scheduleOrderUseCase.execute({
      itens,
      coupon_code,
      isDelivery,
      adress,
      schedule_date,
    });

    return response.status(201).send();
  }
}

export { ScheduleOrderController };