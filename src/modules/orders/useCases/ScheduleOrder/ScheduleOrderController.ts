import { Request, Response } from 'express';
import { validator } from 'src/emailProvider/resultValidator/implements/validator';
import { container } from 'tsyringe';

import { ScheduleOrderUseCase } from './ScheduleOrderUseCase';

class ScheduleOrderController {
  async handler(request: Request, response: Response) {
    const result = validator(request);

    if (result.hasErrors())
      return response.status(400).json({ errors: result.getErrors() });

    const { itens, coupon_code, isDelivery, address, schedule_date } =
      request.body;

    const scheduleOrderUseCase = container.resolve(ScheduleOrderUseCase);

    const order = await scheduleOrderUseCase.execute({
      itens,
      coupon_code,
      isDelivery,
      address,
      schedule_date,
    });

    return response.status(201).json(order);
  }
}

export { ScheduleOrderController };
