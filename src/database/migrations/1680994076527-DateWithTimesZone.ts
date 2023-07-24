import { MigrationInterface, QueryRunner } from 'typeorm';

export class DateWithTimesZone1680994076527 implements MigrationInterface {
  name = 'DateWithTimesZone1680994076527';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Orders" DROP COLUMN "date_of_sale"`);
    await queryRunner.query(
      `ALTER TABLE "Orders" ADD "date_of_sale" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Orders" DROP COLUMN "date_of_sale"`);
    await queryRunner.query(
      `ALTER TABLE "Orders" ADD "date_of_sale" TIMESTAMP NOT NULL DEFAULT now()`
    );
  }
}
