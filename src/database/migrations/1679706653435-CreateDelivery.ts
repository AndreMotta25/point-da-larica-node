import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDelivery1679706653435 implements MigrationInterface {
  name = 'CreateDelivery1679706653435';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Deliverys" ("id" character varying NOT NULL, "adress" character varying NOT NULL, "status" character varying NOT NULL DEFAULT 'A enviar', "send" boolean NOT NULL DEFAULT false, "orderId" character varying NOT NULL, CONSTRAINT "REL_9a2c5bca350bcc1a3af267d9a8" UNIQUE ("orderId"), CONSTRAINT "PK_16743aad9f1e6724608b21ebf80" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "Deliverys" ADD CONSTRAINT "FK_9a2c5bca350bcc1a3af267d9a8a" FOREIGN KEY ("orderId") REFERENCES "Orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Deliverys" DROP CONSTRAINT "FK_9a2c5bca350bcc1a3af267d9a8a"`
    );
    await queryRunner.query(`DROP TABLE "Deliverys"`);
  }
}
