import { EntityTarget, ObjectLiteral, QueryRunner, Repository } from 'typeorm';

interface IQueryRunner {
  getRepository<T extends ObjectLiteral>(
    entity: EntityTarget<T>
  ): Repository<T>;

  getQueryRunner(): QueryRunner;
}

export { IQueryRunner };
