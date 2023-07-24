import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableOrderRenameSomeProperties1685824260049
  implements MigrationInterface
{
  name = 'AlterTableOrderRenameSomeProperties1685824260049';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Orders" DROP COLUMN "discount_value"`
    );
    await queryRunner.query(
      `ALTER TABLE "Orders" DROP COLUMN "discounted_value"`
    );
    await queryRunner.query(
      `ALTER TABLE "Orders" ADD "discount" numeric(18,2) NOT NULL default 0`
    );
    await queryRunner.query(
      `ALTER TABLE "Orders" ADD "final_value" numeric(18,2) NOT NULL default 0`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Orders" DROP COLUMN "final_value"`);
    await queryRunner.query(`ALTER TABLE "Orders" DROP COLUMN "discount"`);
    await queryRunner.query(
      `ALTER TABLE "Orders" ADD "discounted_value" numeric(18,2) NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "Orders" ADD "discount_value" numeric(18,2) NOT NULL`
    );
  }
}
