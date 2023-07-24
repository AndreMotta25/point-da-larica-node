import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEmployer1684814856540 implements MigrationInterface {
    name = 'CreateEmployer1684814856540'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Employers" ("id" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "cpf" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "PK_4415c17ee61fc17cc0a0cfd1d43" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_roles" ("employer_id" character varying NOT NULL, "role_id" character varying NOT NULL, CONSTRAINT "PK_286eed4820ffec1b5bccd62bcec" PRIMARY KEY ("employer_id", "role_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4383d4376f60ea003870e5f801" ON "users_roles" ("employer_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_1cf664021f00b9cc1ff95e17de" ON "users_roles" ("role_id") `);
        await queryRunner.query(`ALTER TABLE "users_roles" ADD CONSTRAINT "FK_4383d4376f60ea003870e5f8010" FOREIGN KEY ("employer_id") REFERENCES "Employers"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_roles" ADD CONSTRAINT "FK_1cf664021f00b9cc1ff95e17de4" FOREIGN KEY ("role_id") REFERENCES "Roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_roles" DROP CONSTRAINT "FK_1cf664021f00b9cc1ff95e17de4"`);
        await queryRunner.query(`ALTER TABLE "users_roles" DROP CONSTRAINT "FK_4383d4376f60ea003870e5f8010"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1cf664021f00b9cc1ff95e17de"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4383d4376f60ea003870e5f801"`);
        await queryRunner.query(`DROP TABLE "users_roles"`);
        await queryRunner.query(`DROP TABLE "Employers"`);
    }

}
