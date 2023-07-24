import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableOrderAddCourtesyAndAdditionalPayment1687633738651
  implements MigrationInterface
{
  name = 'AlterTableOrderAddCourtesyAndAdditionalPayment1687633738651';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Orders" ADD "additionalPayment" numeric(18,2) NOT NULL DEFAULT '0'`
    );
    await queryRunner.query(
      `ALTER TABLE "Orders" ADD "courtesyId" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "Employers" ALTER COLUMN "hashToken" SET DEFAULT '36742695-3edc-407b-9895-130dbdb94ce3'`
    );
    await queryRunner.query(
      `ALTER TABLE "Orders" ADD CONSTRAINT "FK_444a9bf4fb0a98c953c26799312" FOREIGN KEY ("courtesyId") REFERENCES "CourtesyCards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Orders" DROP CONSTRAINT "FK_444a9bf4fb0a98c953c26799312"`
    );
    await queryRunner.query(
      `ALTER TABLE "Employers" ALTER COLUMN "hashToken" SET DEFAULT '40983696-73d4-4032-92b9-9c7f9c4d4899'`
    );
    await queryRunner.query(`ALTER TABLE "Orders" DROP COLUMN "courtesyId"`);
    await queryRunner.query(
      `ALTER TABLE "Orders" DROP COLUMN "additionalPayment"`
    );
  }
}
