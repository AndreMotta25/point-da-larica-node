import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertMinimumValue1673925131244 implements MigrationInterface {
  name = 'InsertMinimumValue1673925131244';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Coupons" ADD "minimumValue" numeric(18,2) NOT NULL DEFAULT '10'`
    );
    await queryRunner.query(`ALTER TABLE "Coupons" DROP COLUMN "created_at"`);
    await queryRunner.query(
      `ALTER TABLE "Coupons" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Coupons" DROP COLUMN "created_at"`);
    await queryRunner.query(
      `ALTER TABLE "Coupons" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`
    );
    await queryRunner.query(`ALTER TABLE "Coupons" DROP COLUMN "minimumValue"`);
  }
}
