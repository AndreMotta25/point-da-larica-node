import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableDeliveryDeleteStatus1690481603542 implements MigrationInterface {
    name = 'AlterTableDeliveryDeleteStatus1690481603542'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Deliverys" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "Employers" ALTER COLUMN "hashToken" SET DEFAULT '410c3819-96ad-4948-afe4-1b62117b7d0c'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Employers" ALTER COLUMN "hashToken" SET DEFAULT 'bf8409c9-b434-4ea5-8086-8fd17438665d'`);
        await queryRunner.query(`ALTER TABLE "Deliverys" ADD "status" character varying NOT NULL DEFAULT 'A enviar'`);
    }

}
