import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { SalesOfWeekUseCase } from './SalesOfWeekUseCase';

class SalesOfWeekController {
  async handle(request: Request, response: Response) {
    const { maxDate, minDate } = request.query;

    const salesOfWeek = container.resolve(SalesOfWeekUseCase);

    const data = await salesOfWeek.execute({
      maxDate: maxDate ? new Date(new Date(`${maxDate}T00:00`)) : undefined,
      minDate: minDate ? new Date(new Date(`${minDate}T00:00`)) : undefined,
    });

    return response.status(200).json(data);
  }
}

export { SalesOfWeekController };
