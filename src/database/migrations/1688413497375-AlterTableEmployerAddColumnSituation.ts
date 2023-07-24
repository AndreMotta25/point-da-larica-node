import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableEmployerAddColumnSituation1688413497375 implements MigrationInterface {
    name = 'AlterTableEmployerAddColumnSituation1688413497375'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Deliverys" DROP CONSTRAINT "FK_9a2c5bca350bcc1a3af267d9a8a"`);
        await queryRunner.query(`ALTER TABLE "Employers" ADD "situation" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "Employers" ALTER COLUMN "hashToken" SET DEFAULT 'e7ca13da-b769-492f-b4a9-51678ddc965c'`);
        await queryRunner.query(`ALTER TABLE "Deliverys" ADD CONSTRAINT "FK_9a2c5bca350bcc1a3af267d9a8a" FOREIGN KEY ("orderId") REFERENCES "Orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Deliverys" DROP CONSTRAINT "FK_9a2c5bca350bcc1a3af267d9a8a"`);
        await queryRunner.query(`ALTER TABLE "Employers" ALTER COLUMN "hashToken" SET DEFAULT 'ac8acb28-a5a5-49cc-b68d-416dd58e8877'`);
        await queryRunner.query(`ALTER TABLE "Employers" DROP COLUMN "situation"`);
        await queryRunner.query(`ALTER TABLE "Deliverys" ADD CONSTRAINT "FK_9a2c5bca350bcc1a3af267d9a8a" FOREIGN KEY ("orderId") REFERENCES "Orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
