import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterOrderChangeToDelivery1679783834573 implements MigrationInterface {
    name = 'AlterOrderChangeToDelivery1679783834573'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Orders" RENAME COLUMN "deliver" TO "delivery"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Orders" RENAME COLUMN "delivery" TO "deliver"`);
    }

}
