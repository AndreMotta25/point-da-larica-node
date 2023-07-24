import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterOrdersAddCanceled1679276147933 implements MigrationInterface {
  name = 'AlterOrdersAddCanceled1679276147933';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Orders" RENAME COLUMN "status" TO "canceled"`
    );
    await queryRunner.query(`ALTER TABLE "Orders" DROP COLUMN "canceled"`);
    await queryRunner.query(
      `ALTER TABLE "Orders" ADD "canceled" boolean NOT NULL DEFAULT false`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Orders" DROP COLUMN "canceled"`);
    await queryRunner.query(
      `ALTER TABLE "Orders" ADD "canceled" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "Orders" RENAME COLUMN "canceled" TO "status"`
    );
  }
}
