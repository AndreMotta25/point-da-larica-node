import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableOrderAddEmployer1693765327322 implements MigrationInterface {
    name = 'AlterTableOrderAddEmployer1693765327322'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Orders" ADD "employerId" character varying`);
        await queryRunner.query(`ALTER TABLE "Employers" ALTER COLUMN "hashToken" SET DEFAULT '534b0223-6172-40d3-be20-e67d97a94669'`);
        await queryRunner.query(`ALTER TABLE "Orders" ADD CONSTRAINT "FK_9878cda14760ef0f4e4b86ab4d7" FOREIGN KEY ("employerId") REFERENCES "Employers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Orders" DROP CONSTRAINT "FK_9878cda14760ef0f4e4b86ab4d7"`);
        await queryRunner.query(`ALTER TABLE "Employers" ALTER COLUMN "hashToken" SET DEFAULT 'e62f91aa-7641-4ca4-8ccf-abd2ca21e3b2'`);
        await queryRunner.query(`ALTER TABLE "Orders" DROP COLUMN "employerId"`);
    }

}
