import { IData } from './implementations/ExcelManager';

interface IExcelManager {
  setData(list: IData[]): void;
  save(filename: string): Promise<void>;
}

export { IExcelManager };
