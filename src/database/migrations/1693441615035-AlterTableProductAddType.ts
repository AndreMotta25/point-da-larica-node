import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableProductAddType1693441615035 implements MigrationInterface {
    name = 'AlterTableProductAddType1693441615035'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."Products_type_enum" AS ENUM('1', '2', '3', '4')`);
        await queryRunner.query(`ALTER TABLE "Products" ADD "type" "public"."Products_type_enum" NOT NULL DEFAULT '3'`);
        await queryRunner.query(`ALTER TABLE "Employers" ALTER COLUMN "hashToken" SET DEFAULT 'e62f91aa-7641-4ca4-8ccf-abd2ca21e3b2'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Employers" ALTER COLUMN "hashToken" SET DEFAULT '5b3498a7-afd0-4bc2-a317-8e233b539483'`);
        await queryRunner.query(`ALTER TABLE "Products" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."Products_type_enum"`);
    }

}
