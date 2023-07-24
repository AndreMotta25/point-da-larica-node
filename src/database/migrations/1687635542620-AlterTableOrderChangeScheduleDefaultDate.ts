import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableOrderChangeScheduleDefaultDate1687635542620 implements MigrationInterface {
    name = 'AlterTableOrderChangeScheduleDefaultDate1687635542620'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Employers" ALTER COLUMN "hashToken" SET DEFAULT 'ab32702b-967b-4eb0-bc26-23df5fd9bcc8'`);
        await queryRunner.query(`ALTER TABLE "Orders" ALTER COLUMN "schedule_date" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Orders" ALTER COLUMN "schedule_date" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Employers" ALTER COLUMN "hashToken" SET DEFAULT '36742695-3edc-407b-9895-130dbdb94ce3'`);
    }

}
