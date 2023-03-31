import { MigrationInterface, QueryRunner } from "typeorm";

export class default1675992428558 implements MigrationInterface {
    name = 'default1675992428558'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "budgets" DROP COLUMN "code"`);
        await queryRunner.query(`ALTER TABLE "budgets" ADD "code" SERIAL NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "budgets" DROP COLUMN "code"`);
        await queryRunner.query(`ALTER TABLE "budgets" ADD "code" character varying NOT NULL`);
    }

}
