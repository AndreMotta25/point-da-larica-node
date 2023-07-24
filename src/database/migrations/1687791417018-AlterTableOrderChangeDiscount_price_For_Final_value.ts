import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableOrderChangeDiscountPriceForFinalValue1687791417018 implements MigrationInterface {
    name = 'AlterTableOrderChangeDiscountPriceForFinalValue1687791417018'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Orders" RENAME COLUMN "discount_price" TO "final_value"`);
        await queryRunner.query(`ALTER TABLE "Employers" ALTER COLUMN "hashToken" SET DEFAULT 'aa3d56ff-5ea3-43ab-b672-73d20e1318b4'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Employers" ALTER COLUMN "hashToken" SET DEFAULT 'ab32702b-967b-4eb0-bc26-23df5fd9bcc8'`);
        await queryRunner.query(`ALTER TABLE "Orders" RENAME COLUMN "final_value" TO "discount_price"`);
    }

}
