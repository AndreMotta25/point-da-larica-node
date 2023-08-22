import { Stats } from 'graceful-fs';

import { IExcel } from '../IExcel';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const excel = require('excel4node');

class Excel implements IExcel {
  private workBook;
  public sheets: any[];
  public activeSheet: any;

  constructor() {
    this.workBook = new excel.Workbook();
    this.sheets = [];
  }

  addWorkSheet(name: string) {
    const sheet = this.workBook.addWorksheet(name);
    this.sheets.push(sheet);

    return sheet;
  }

  selectSheet(index: number) {
    // eslint-disable-next-line prefer-destructuring
    if (index >= this.sheets.length) this.activeSheet = this.sheets[0];
    else this.activeSheet = this.sheets[index];

    return this.activeSheet;
  }

  async write(filepath: string, error: (err: Error, stats: Stats) => void) {
    this.workBook.write(`${filepath}`, error);
  }
}
export { Excel };
