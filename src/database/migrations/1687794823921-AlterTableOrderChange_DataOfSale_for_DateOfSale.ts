import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableOrderChangeDataOfSaleForDateOfSale1687794823921 implements MigrationInterface {
    name = 'AlterTableOrderChangeDataOfSaleForDateOfSale1687794823921'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Orders" RENAME COLUMN "data_of_sale" TO "date_of_sale"`);
        await queryRunner.query(`ALTER TABLE "Employers" ALTER COLUMN "hashToken" SET DEFAULT 'ac8acb28-a5a5-49cc-b68d-416dd58e8877'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Employers" ALTER COLUMN "hashToken" SET DEFAULT 'aa3d56ff-5ea3-43ab-b672-73d20e1318b4'`);
        await queryRunner.query(`ALTER TABLE "Orders" RENAME COLUMN "date_of_sale" TO "data_of_sale"`);
    }

}
