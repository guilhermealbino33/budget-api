import { MigrationInterface, QueryRunner } from 'typeorm';

export class default1671038369358 implements MigrationInterface {
  name = 'default1671038369358';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "cities" ("code" character varying NOT NULL, "name" character varying NOT NULL, "state_code" character varying NOT NULL, CONSTRAINT "PK_23ef12c9f387e2cbac07e7d2927" PRIMARY KEY ("code"))`
    );
    await queryRunner.query(
      `CREATE TABLE "states" ("code" character varying NOT NULL, "name" character varying NOT NULL, "uf" character varying NOT NULL, CONSTRAINT "PK_b8af4194277281dcfe08be42643" PRIMARY KEY ("code"))`
    );
    await queryRunner.query(
      `CREATE TABLE "salesman" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "account_type" character varying NOT NULL, "cpf" character varying, "cnpj" character varying, "ie" character varying, "city_code" character varying NOT NULL, "district" character varying NOT NULL, "address" character varying NOT NULL, "complement" character varying, "address_number" character varying NOT NULL, "cep" character varying NOT NULL, "phone_number_1" character varying NOT NULL, "phone_number_2" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "cityCode" character varying, "stateCode" character varying, CONSTRAINT "PK_f2a2da02f674976f194d7f9d5c2" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "role" character varying NOT NULL, "password" character varying NOT NULL, "is_admin" boolean NOT NULL, "is_salesman" boolean NOT NULL, "salesman_id" uuid, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "REL_be31110f16a395a8c1facfa229" UNIQUE ("salesman_id"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "users_tokens" ("id" character varying NOT NULL, "refresh_token" character varying NOT NULL, "user_id" uuid NOT NULL, "expires_date" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9f236389174a6ccbd746f53dca8" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "additional_items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" character varying NOT NULL, "name" character varying NOT NULL, "list_price" numeric(10,2) NOT NULL, "description" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_badf2cbfa58e402131a956e1ad3" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "budget_additional_items" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "additional_item_id" uuid NOT NULL, "budget_id" uuid NOT NULL, "quantity" integer NOT NULL, "unit_price" numeric(10,2) NOT NULL, "discount" numeric(10,2) NOT NULL DEFAULT '0', "total_price" numeric(10,2) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1d702944bf877832fab236d1ec3" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "customers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "account_type" character varying NOT NULL, "requester" character varying, "cpf" character varying, "cnpj" character varying, "ie" character varying, "city_code" character varying NOT NULL, "district" character varying NOT NULL, "address" character varying NOT NULL, "complement" character varying, "address_number" character varying NOT NULL DEFAULT 'S/N', "cep" character varying NOT NULL, "phone_number_1" character varying NOT NULL, "phone_number_2" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "cityCode" character varying, "stateCode" character varying, CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "budgets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" character varying NOT NULL, "status" character varying NOT NULL DEFAULT 'new', "customer_id" uuid NOT NULL, "salesman_id" uuid NOT NULL, "delivery_type" character varying NOT NULL, "delivery_value" numeric(10,2) DEFAULT '0', "observations" character varying, "closed" boolean NOT NULL DEFAULT false, "total_value" numeric(10,2) NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9c8a51748f82387644b773da482" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "budget_products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "product_id" uuid NOT NULL, "budget_id" uuid NOT NULL, "quantity" integer NOT NULL, "unit_price" numeric(10,2) NOT NULL, "discount" numeric(10,2) NOT NULL DEFAULT '0', "total_price" numeric(10,2) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8b69e9c73785f0eab005f1fd2ea" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "categories" ("id" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "products_images" ("id" character varying NOT NULL, "product_id" uuid NOT NULL, "file_name" character varying NOT NULL, "img_url" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_12730b169c59b35f40ccdf36fd5" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "category_id" character varying NOT NULL, "code" character varying NOT NULL, "installation_area" numeric(10,2), "list_price" numeric(10,2) NOT NULL, "description" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "salesman" ADD CONSTRAINT "FK_42614838f0c9171d440d3c762c0" FOREIGN KEY ("cityCode") REFERENCES "cities"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "salesman" ADD CONSTRAINT "FK_748b646d6bd5a5a7e7b7c341b27" FOREIGN KEY ("stateCode") REFERENCES "states"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_be31110f16a395a8c1facfa2292" FOREIGN KEY ("salesman_id") REFERENCES "salesman"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "users_tokens" ADD CONSTRAINT "FK_32f96022cc5076fe565a5cba20b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "budget_additional_items" ADD CONSTRAINT "FK_11b22d1340357aee7718ef7c6a8" FOREIGN KEY ("additional_item_id") REFERENCES "additional_items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "budget_additional_items" ADD CONSTRAINT "FK_308ddbf6cd4ee983b4fcc4c513f" FOREIGN KEY ("budget_id") REFERENCES "budgets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ADD CONSTRAINT "FK_4f19dde3edfa47d3ffe870e6f88" FOREIGN KEY ("cityCode") REFERENCES "cities"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "customers" ADD CONSTRAINT "FK_27eca5985adaa7cf63d5e99659f" FOREIGN KEY ("stateCode") REFERENCES "states"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "budgets" ADD CONSTRAINT "FK_aa058898ae3aea333618812fecb" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "budgets" ADD CONSTRAINT "FK_84d5bbb676468150eb88865936d" FOREIGN KEY ("salesman_id") REFERENCES "salesman"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "budget_products" ADD CONSTRAINT "FK_3450b0b2c932a2ce9784300999b" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "budget_products" ADD CONSTRAINT "FK_66d6df4a4a1b841dd8da43907d8" FOREIGN KEY ("budget_id") REFERENCES "budgets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "products_images" ADD CONSTRAINT "FK_9221a751985a7b44696b8774855" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_9a5f6868c96e0069e699f33e124" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_9a5f6868c96e0069e699f33e124"`
    );
    await queryRunner.query(
      `ALTER TABLE "products_images" DROP CONSTRAINT "FK_9221a751985a7b44696b8774855"`
    );
    await queryRunner.query(
      `ALTER TABLE "budget_products" DROP CONSTRAINT "FK_66d6df4a4a1b841dd8da43907d8"`
    );
    await queryRunner.query(
      `ALTER TABLE "budget_products" DROP CONSTRAINT "FK_3450b0b2c932a2ce9784300999b"`
    );
    await queryRunner.query(
      `ALTER TABLE "budgets" DROP CONSTRAINT "FK_84d5bbb676468150eb88865936d"`
    );
    await queryRunner.query(
      `ALTER TABLE "budgets" DROP CONSTRAINT "FK_aa058898ae3aea333618812fecb"`
    );
    await queryRunner.query(
      `ALTER TABLE "customers" DROP CONSTRAINT "FK_27eca5985adaa7cf63d5e99659f"`
    );
    await queryRunner.query(
      `ALTER TABLE "customers" DROP CONSTRAINT "FK_4f19dde3edfa47d3ffe870e6f88"`
    );
    await queryRunner.query(
      `ALTER TABLE "budget_additional_items" DROP CONSTRAINT "FK_308ddbf6cd4ee983b4fcc4c513f"`
    );
    await queryRunner.query(
      `ALTER TABLE "budget_additional_items" DROP CONSTRAINT "FK_11b22d1340357aee7718ef7c6a8"`
    );
    await queryRunner.query(
      `ALTER TABLE "users_tokens" DROP CONSTRAINT "FK_32f96022cc5076fe565a5cba20b"`
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_be31110f16a395a8c1facfa2292"`
    );
    await queryRunner.query(
      `ALTER TABLE "salesman" DROP CONSTRAINT "FK_748b646d6bd5a5a7e7b7c341b27"`
    );
    await queryRunner.query(
      `ALTER TABLE "salesman" DROP CONSTRAINT "FK_42614838f0c9171d440d3c762c0"`
    );
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(`DROP TABLE "products_images"`);
    await queryRunner.query(`DROP TABLE "categories"`);
    await queryRunner.query(`DROP TABLE "budget_products"`);
    await queryRunner.query(`DROP TABLE "budgets"`);
    await queryRunner.query(`DROP TABLE "customers"`);
    await queryRunner.query(`DROP TABLE "budget_additional_items"`);
    await queryRunner.query(`DROP TABLE "additional_items"`);
    await queryRunner.query(`DROP TABLE "users_tokens"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "salesman"`);
    await queryRunner.query(`DROP TABLE "states"`);
    await queryRunner.query(`DROP TABLE "cities"`);
  }
}
