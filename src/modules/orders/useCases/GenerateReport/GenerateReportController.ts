import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GenerateReportUseCase } from './GenerateReportUseCase';

class GenerateReportController {
  async handle(request: Request, response: Response) {
    const { email } = request.body;

    const generateReporteUseCase = container.resolve(GenerateReportUseCase);
    await generateReporteUseCase.execute(email);

    return response.status(201).send();
  }
}

export { GenerateReportController };
