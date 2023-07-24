import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateOrders1679174123262 implements MigrationInterface {
  name = 'CreateOrders1679174123262';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Orders" ("id" character varying NOT NULL, "full_value" numeric(18,2) NOT NULL, "discount_value" numeric(18,2) NOT NULL, "date_of_sale" TIMESTAMP NOT NULL DEFAULT now(), "status" character varying NOT NULL, "code" character varying NOT NULL, "coupon_code" character varying, CONSTRAINT "PK_ce8e3c4d56e47ff9c8189c26213" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "OrdersList" ("id" character varying NOT NULL, "total" numeric(18,2) NOT NULL, "amount" integer NOT NULL, "orderId" character varying, "productId" character varying, CONSTRAINT "PK_e5f50d0319f3387415499a8bb56" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "orders_product_list_products" ("ordersId" character varying NOT NULL, "productsId" character varying NOT NULL, CONSTRAINT "PK_c19178610ae35a9bc06a12d6116" PRIMARY KEY ("ordersId", "productsId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6d4344d138be3738d2af8845ec" ON "orders_product_list_products" ("ordersId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3d07380359a0e8ad13a1cc0f7d" ON "orders_product_list_products" ("productsId") `
    );
    await queryRunner.query(
      `ALTER TABLE "OrdersList" ADD CONSTRAINT "FK_76b1ab22259f6b3b731be9d5ba3" FOREIGN KEY ("orderId") REFERENCES "Orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "OrdersList" ADD CONSTRAINT "FK_721eebb2df0aae549190d65bac4" FOREIGN KEY ("productId") REFERENCES "Orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "orders_product_list_products" ADD CONSTRAINT "FK_6d4344d138be3738d2af8845ec6" FOREIGN KEY ("ordersId") REFERENCES "Orders"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "orders_product_list_products" ADD CONSTRAINT "FK_3d07380359a0e8ad13a1cc0f7d9" FOREIGN KEY ("productsId") REFERENCES "Products"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders_product_list_products" DROP CONSTRAINT "FK_3d07380359a0e8ad13a1cc0f7d9"`
    );
    await queryRunner.query(
      `ALTER TABLE "orders_product_list_products" DROP CONSTRAINT "FK_6d4344d138be3738d2af8845ec6"`
    );
    await queryRunner.query(
      `ALTER TABLE "OrdersList" DROP CONSTRAINT "FK_721eebb2df0aae549190d65bac4"`
    );
    await queryRunner.query(
      `ALTER TABLE "OrdersList" DROP CONSTRAINT "FK_76b1ab22259f6b3b731be9d5ba3"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3d07380359a0e8ad13a1cc0f7d"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_6d4344d138be3738d2af8845ec"`
    );
    await queryRunner.query(`DROP TABLE "orders_product_list_products"`);
    await queryRunner.query(`DROP TABLE "OrdersList"`);
    await queryRunner.query(`DROP TABLE "Orders"`);
  }
}
