import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableDeliveryRenameAdressToAddress1690481733191
  implements MigrationInterface
{
  name = 'AlterTableDeliveryRenameAdressToAddress1690481733191';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Deliverys" RENAME COLUMN "adress" TO "address"`
    );
    await queryRunner.query(
      `ALTER TABLE "Employers" ALTER COLUMN "hashToken" SET DEFAULT '5b3498a7-afd0-4bc2-a317-8e233b539483'`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Employers" ALTER COLUMN "hashToken" SET DEFAULT 'a5512c22-88a9-4703-858c-5d1eb60a0b01'`
    );
    await queryRunner.query(
      `ALTER TABLE "Deliverys" RENAME COLUMN "address" TO "adress"`
    );
  }
}
