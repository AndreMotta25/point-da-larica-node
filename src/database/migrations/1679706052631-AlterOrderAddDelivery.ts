import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterOrderAddDelivery1679706052631 implements MigrationInterface {
  name = 'AlterOrderAddDelivery1679706052631';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Orders" ADD "deliver" boolean NOT NULL DEFAULT false`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Orders" DROP COLUMN "deliver"`);
  }
}
