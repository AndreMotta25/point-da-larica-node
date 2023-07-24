import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableEmployerAddColumnName1684872445518 implements MigrationInterface {
    name = 'AlterTableEmployerAddColumnName1684872445518'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Employers" ADD "name" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Employers" DROP COLUMN "name"`);
    }

}
