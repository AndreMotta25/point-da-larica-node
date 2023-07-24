import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterOrderListOnDeleteCascade1679538364891 implements MigrationInterface {
    name = 'AlterOrderListOnDeleteCascade1679538364891'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "OrdersList" DROP CONSTRAINT "FK_76b1ab22259f6b3b731be9d5ba3"`);
        await queryRunner.query(`ALTER TABLE "OrdersList" ADD CONSTRAINT "FK_76b1ab22259f6b3b731be9d5ba3" FOREIGN KEY ("orderId") REFERENCES "Orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "OrdersList" DROP CONSTRAINT "FK_76b1ab22259f6b3b731be9d5ba3"`);
        await queryRunner.query(`ALTER TABLE "OrdersList" ADD CONSTRAINT "FK_76b1ab22259f6b3b731be9d5ba3" FOREIGN KEY ("orderId") REFERENCES "Orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
