import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProducts1679162686016 implements MigrationInterface {
  name = 'CreateProducts1679162686016';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Products" ("id" character varying NOT NULL, "value" numeric(18,2) NOT NULL, "name" character varying NOT NULL, "description" text NOT NULL, CONSTRAINT "PK_36a07cc432789830e7fb7b58a83" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "Products"`);
  }
}
