import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableCourtesyCardChangeColumnExpireInToTimestamp1687461067677
  implements MigrationInterface
{
  name = 'AlterTableCourtesyCardChangeColumnExpireInToTimestamp1687461067677';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Employers" ALTER COLUMN "hashToken" SET DEFAULT '40983696-73d4-4032-92b9-9c7f9c4d4899'`
    );
    await queryRunner.query(
      `ALTER TABLE "Orders" ALTER COLUMN "schedule_date" DROP DEFAULT`
    );
    await queryRunner.query(
      `ALTER TABLE "CourtesyCards" DROP COLUMN "expiresIn"`
    );
    await queryRunner.query(
      `ALTER TABLE "CourtesyCards" ADD "expiresIn" TIMESTAMP NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "CourtesyCards" DROP COLUMN "expiresIn"`
    );
    await queryRunner.query(
      `ALTER TABLE "CourtesyCards" ADD "expiresIn" TIME NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "Orders" ALTER COLUMN "schedule_date" SET DEFAULT '2023-06-05 22:18:18.24'`
    );
    await queryRunner.query(
      `ALTER TABLE "Employers" ALTER COLUMN "hashToken" SET DEFAULT '9360048d-abb8-48ad-b099-38796524d424'`
    );
  }
}
