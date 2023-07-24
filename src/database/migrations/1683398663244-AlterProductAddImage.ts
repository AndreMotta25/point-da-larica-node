import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterProductAddImage1683398663244 implements MigrationInterface {
    name = 'AlterProductAddImage1683398663244'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Products" ADD "image" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Products" DROP COLUMN "image"`);
    }

}
