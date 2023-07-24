import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCourtesyCard1685928890240 implements MigrationInterface {
  name = 'CreateCourtesyCard1685928890240';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "CourtesyCards" ("id" character varying NOT NULL, "value" numeric(18,2) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "expiresIn" TIME NOT NULL, "code" character varying(5) NOT NULL, "cpf" character varying NOT NULL, "used" boolean NOT NULL DEFAULT false, "motivation" text NOT NULL, "employerId" character varying, CONSTRAINT "PK_126e39b242c32359b5e266bf710" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "Employers" ALTER COLUMN "hashToken" SET DEFAULT 'bfb264fb-37e6-478c-a6cb-00f783ff06c0'`
    );
    await queryRunner.query(
      `ALTER TABLE "CourtesyCards" ADD CONSTRAINT "FK_c2072660eb454e7c99876116b22" FOREIGN KEY ("employerId") REFERENCES "Employers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "CourtesyCards" DROP CONSTRAINT "FK_c2072660eb454e7c99876116b22"`
    );
    await queryRunner.query(
      `ALTER TABLE "Employers" ALTER COLUMN "hashToken" SET DEFAULT 'b1aa0b28-c315-4d0c-8a0a-3e953b983831'`
    );
    await queryRunner.query(`DROP TABLE "CourtesyCards"`);
  }
}
