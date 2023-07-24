import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableOrderChangeColumnScheduleToIsSchedule1689534498620
  implements MigrationInterface
{
  name = 'AlterTableOrderChangeColumnScheduleToIsSchedule1689534498620';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Orders" RENAME COLUMN "schedule" TO "isSchedule"`
    );
    await queryRunner.query(
      `ALTER TABLE "Employers" ALTER COLUMN "hashToken" SET DEFAULT 'bf8409c9-b434-4ea5-8086-8fd17438665d'`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Employers" ALTER COLUMN "hashToken" SET DEFAULT 'e7ca13da-b769-492f-b4a9-51678ddc965c'`
    );
    await queryRunner.query(
      `ALTER TABLE "Orders" RENAME COLUMN "isSchedule" TO "schedule"`
    );
  }
}
