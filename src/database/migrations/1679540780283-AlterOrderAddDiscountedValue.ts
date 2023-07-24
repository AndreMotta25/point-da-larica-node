import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterOrderAddDiscountedValue1679540780283 implements MigrationInterface {
    name = 'AlterOrderAddDiscountedValue1679540780283'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Orders" ADD "discounted_value" numeric(18,2) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Orders" DROP COLUMN "discounted_value"`);
    }

}
