import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableEmployerAndRemoveUsername1685828357140
  implements MigrationInterface
{
  name = 'AlterTableEmployerAndRemoveUsername1685828357140';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Employers" DROP COLUMN "username"`);
    await queryRunner.query(
      `ALTER TABLE "Orders" ALTER COLUMN "discount" DROP DEFAULT`
    );
    await queryRunner.query(
      `ALTER TABLE "Orders" ALTER COLUMN "final_value" DROP DEFAULT`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Orders" ALTER COLUMN "final_value" SET DEFAULT '0'`
    );
    await queryRunner.query(
      `ALTER TABLE "Orders" ALTER COLUMN "discount" SET DEFAULT '0'`
    );
    await queryRunner.query(
      `ALTER TABLE "Employers" ADD "username" character varying NOT NULL`
    );
  }
}
