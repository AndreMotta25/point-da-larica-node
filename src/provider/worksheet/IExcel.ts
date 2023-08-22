import { Stats } from 'graceful-fs';

interface IExcel {
  addWorkSheet(name: string): any;
  selectSheet(index: number): any;
  write(
    filepath: string,
    error: (err: Error, stats: Stats) => void
  ): Promise<void>;
}
export { IExcel };
