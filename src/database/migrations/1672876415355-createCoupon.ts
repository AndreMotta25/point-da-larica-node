import { MigrationInterface, QueryRunner } from 'typeorm';

export class createCoupon1672876415355 implements MigrationInterface {
  name = 'createCoupon1672876415355';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Coupons" ("id" character varying NOT NULL, "code" character varying(5) NOT NULL, "value" numeric(18,2) NOT NULL, "amount" integer NOT NULL, "expire_at" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "valid" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_2418d6bce705c88195d11a98547" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "Coupons"`);
  }
}
