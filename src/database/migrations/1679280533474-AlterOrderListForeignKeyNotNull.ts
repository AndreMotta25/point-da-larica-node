import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterOrderListForeignKeyNotNull1679280533474
  implements MigrationInterface
{
  name = 'AlterOrderListForeignKeyNotNull1679280533474';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "OrdersList" DROP CONSTRAINT "FK_76b1ab22259f6b3b731be9d5ba3"`
    );
    await queryRunner.query(
      `ALTER TABLE "OrdersList" DROP CONSTRAINT "FK_721eebb2df0aae549190d65bac4"`
    );
    await queryRunner.query(
      `ALTER TABLE "OrdersList" ALTER COLUMN "orderId" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "OrdersList" ALTER COLUMN "productId" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "OrdersList" ADD CONSTRAINT "FK_76b1ab22259f6b3b731be9d5ba3" FOREIGN KEY ("orderId") REFERENCES "Orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
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
      `ALTER TABLE "OrdersList" DROP CONSTRAINT "FK_76b1ab22259f6b3b731be9d5ba3"`
    );
    await queryRunner.query(
      `ALTER TABLE "OrdersList" ALTER COLUMN "productId" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "OrdersList" ALTER COLUMN "orderId" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "OrdersList" ADD CONSTRAINT "FK_721eebb2df0aae549190d65bac4" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "OrdersList" ADD CONSTRAINT "FK_76b1ab22259f6b3b731be9d5ba3" FOREIGN KEY ("orderId") REFERENCES "Orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
