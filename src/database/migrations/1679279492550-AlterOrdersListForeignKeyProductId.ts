import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterOrdersListForeignKeyProductId1679279492550
  implements MigrationInterface
{
  name = 'AlterOrdersListForeignKeyProductId1679279492550';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "OrdersList" DROP CONSTRAINT "FK_721eebb2df0aae549190d65bac4"`
    );
    await queryRunner.query(
      `ALTER TABLE "OrdersList" ADD CONSTRAINT "FK_721eebb2df0aae549190d65bac4" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "OrdersList" DROP CONSTRAINT "FK_721eebb2df0aae549190d65bac4"`
    );
    await queryRunner.query(
      `ALTER TABLE "OrdersList" ADD CONSTRAINT "FK_721eebb2df0aae549190d65bac4" FOREIGN KEY ("productId") REFERENCES "Orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
