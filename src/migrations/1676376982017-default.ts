import { MigrationInterface, QueryRunner } from 'typeorm';

export class default1676376982017 implements MigrationInterface {
  name = 'default1676376982017';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "budget_products" ADD "observations" character varying`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "budget_products" DROP COLUMN "observations"`
    );
  }
}
