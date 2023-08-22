import { Stats } from 'graceful-fs';
import { inject, injectable } from 'tsyringe';

import { IGetSalesOfWeekResponse } from '@modules/orders/useCases/SalesOfWeek/SalesOfWeekUseCase';

import { IExcelManager } from '../IExcelManager';
import { style } from '../styles/defaultStyle';
import { Excel } from './Excel';

@injectable()
class ExcelManager implements IExcelManager {
  public sheet: any;
  private column: number;

  constructor(@inject('Excel') private workSheet: Excel) {
    this.sheet = this.workSheet.addWorkSheet('Sheet 1');
  }

  setData(list: IGetSalesOfWeekResponse[]) {
    this.sheet.cell(1, 1).string('Dados').style(style);
    this.sheet.cell(3, 1).string('Vendas');
    this.sheet.cell(4, 1).string('Soma');

    list.forEach(({ dayOfWeek, count, sum, dayOfMonth }, index) => {
      const CELL = 2;
      const column = index + CELL;

      this.sheet.cell(1, column).string(`${dayOfWeek}(${dayOfMonth})`);

      this.sheet.cell(3, column).number(Number(count) || 0);
      this.sheet.cell(4, column).number(+sum || 0);
      this.column = column;
    });

    this.setSum(list);
    this.highlightTotal();
  }

  private setSum(list: IGetSalesOfWeekResponse[]) {
    // sum
    const sum = list
      .map(({ sum }) => Number(sum) || 0)
      .reduce((acc, num) => acc + num);

    this.sheet.cell(6, 1).string('Total');
    this.sheet
      .cell(1, this.column + 1)
      .string('Total')
      .style(style);
    this.sheet
      .cell(6, this.column + 1)
      .number(sum)
      .style(style);
  }
  private highlightTotal() {
    this.sheet.cell(6, 1, 6, this.column + 1).style({
      fill: {
        type: 'pattern',
        patternType: 'solid',
        fgColor: '#00ff00',
      },
    });
  }

  async save(filename: string) {
    this.workSheet.write(`${filename}`, (err: Error, stats: Stats) => {
      if (err) {
        throw new Error(err.message);
      }
    });
  }
}

export { ExcelManager };
