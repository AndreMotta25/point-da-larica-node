import database from 'src/database';
import { EntityTarget, ObjectLiteral, QueryRunner, Repository } from 'typeorm';

class QRunner {
  private queryRunner: QueryRunner;

  constructor() {
    this.queryRunner = database.createQueryRunner();
  }

  getRepository<T extends ObjectLiteral>(
    entity: EntityTarget<T>
  ): Repository<T> {
    return this.queryRunner.manager.getRepository(entity);
  }

  getQueryRunner() {
    return this.queryRunner;
  }
}

export { QRunner };
