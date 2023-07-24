import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRoleAndPermissions1684802096066
  implements MigrationInterface
{
  name = 'CreateRoleAndPermissions1684802096066';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Permissions" ("id" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_e83fa8a46bd5a3bfaa095d40812" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "Roles" ("id" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_efba48c6a0c7a9b6260f771b165" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "roles_permissions" ("role_id" character varying NOT NULL, "permission_id" character varying NOT NULL, CONSTRAINT "PK_0cd11f0b35c4d348c6ebb9b36b7" PRIMARY KEY ("role_id", "permission_id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7d2dad9f14eddeb09c256fea71" ON "roles_permissions" ("role_id") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_337aa8dba227a1fe6b73998307" ON "roles_permissions" ("permission_id") `
    );
    await queryRunner.query(
      `ALTER TABLE "roles_permissions" ADD CONSTRAINT "FK_7d2dad9f14eddeb09c256fea719" FOREIGN KEY ("role_id") REFERENCES "Roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "roles_permissions" ADD CONSTRAINT "FK_337aa8dba227a1fe6b73998307b" FOREIGN KEY ("permission_id") REFERENCES "Permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "roles_permissions" DROP CONSTRAINT "FK_337aa8dba227a1fe6b73998307b"`
    );
    await queryRunner.query(
      `ALTER TABLE "roles_permissions" DROP CONSTRAINT "FK_7d2dad9f14eddeb09c256fea719"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_337aa8dba227a1fe6b73998307"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7d2dad9f14eddeb09c256fea71"`
    );
    await queryRunner.query(`DROP TABLE "roles_permissions"`);
    await queryRunner.query(`DROP TABLE "Roles"`);
    await queryRunner.query(`DROP TABLE "Permissions"`);
  }
}
