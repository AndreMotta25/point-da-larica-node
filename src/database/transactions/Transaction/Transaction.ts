import { inject, injectable } from 'tsyringe';

import { IQueryRunner } from '../QueryRunner/IQueryRunner';
import { ITransaction } from './ITransaction';

@injectable()
class Transaction implements ITransaction {
  constructor(@inject('QueryRunner') private queryRunner: IQueryRunner) {}

  async startTransaction() {
    await this.queryRunner.getQueryRunner().startTransaction();
  }

  async commitTransaction() {
    await this.queryRunner.getQueryRunner().commitTransaction();
  }

  async rollBackTransaction() {
    console.log('rollback');
    await this.queryRunner.getQueryRunner().rollbackTransaction();
  }
}

export { Transaction };
