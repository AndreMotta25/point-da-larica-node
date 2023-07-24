import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterOrderDelivery1682192277146 implements MigrationInterface {
    name = 'AlterOrderDelivery1682192277146'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Orders" RENAME COLUMN "delivery" TO "isDelivery"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Orders" RENAME COLUMN "isDelivery" TO "delivery"`);
    }

}
