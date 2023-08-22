import { unlink } from 'fs/promises';
import { ISendMail } from 'src/provider/email/ISendMail';
import { IExcelManager } from 'src/provider/worksheet/IExcelManager';
import { container, inject, injectable } from 'tsyringe';

import AppError from '@errors/AppError';
import { IEmployerRepository } from '@modules/users/repositories/IEmployerRepository';

import { SalesOfWeekUseCase } from '../SalesOfWeek/SalesOfWeekUseCase';

@injectable()
class GenerateReportUseCase {
  constructor(
    @inject('ExcelManager') private excelManager: IExcelManager,
    @inject('EmployerRepository')
    private employerRepository: IEmployerRepository,
    @inject('SendMail') private senderEmail: ISendMail
  ) {}

  async execute(email: string) {
    const employer = await this.employerRepository.findByEmail(email);

    if (!employer) throw new AppError('Empregado não achado', 404);

    const salesOfWeek = container.resolve(SalesOfWeekUseCase);

    const sales = await await salesOfWeek.execute({});

    this.excelManager.setData(sales);
    await this.excelManager.save('excel.xlsx');

    await this.senderEmail.sendEmail({
      to: email,
      template: 'report',
      subject: 'Relatorio semanal de vendas',
      attachments: [
        {
          filename: 'relatorio_semanal.xlsx',
          path: './excel.xlsx',
          cid: 'excel',
        },
      ],
    });

    setTimeout(async () => {
      await unlink('./excel.xlsx');
    }, 2000);
  }
}

export { GenerateReportUseCase };
