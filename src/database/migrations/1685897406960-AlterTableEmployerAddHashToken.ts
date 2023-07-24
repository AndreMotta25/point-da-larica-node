import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableEmployerAddHashToken1685897406960
  implements MigrationInterface
{
  name = 'AlterTableEmployerAddHashToken1685897406960';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Employers" ADD "hashToken" character varying NOT NULL DEFAULT '59aaa169-b5a6-44e8-8bb7-c1ca9ae0e1d5'`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "Employers" DROP COLUMN "hashToken"`);
  }
}
