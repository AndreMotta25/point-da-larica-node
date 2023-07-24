import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableOrderAddScheduleInformations1686003492135
  implements MigrationInterface
{
  name = 'AlterTableOrderAddScheduleInformations1686003492135';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Orders" ADD "schedule" boolean NOT NULL DEFAULT false`
    );
    await queryRunner.query(
      `ALTER TABLE "Orders" ADD "schedule_date" TIMESTAMP NOT NULL DEFAULT 'now()'`
    );
    await queryRunner.query(
      `ALTER TABLE "Employers" ALTER COLUMN "hashToken" SET DEFAULT '9360048d-abb8-48ad-b099-38796524d424'`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Employers" ALTER COLUMN "hashToken" SET DEFAULT 'bfb264fb-37e6-478c-a6cb-00f783ff06c0'`
    );
    await queryRunner.query(`ALTER TABLE "Orders" DROP COLUMN "schedule_date"`);
    await queryRunner.query(`ALTER TABLE "Orders" DROP COLUMN "schedule"`);
  }
}
