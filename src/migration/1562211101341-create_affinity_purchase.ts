import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAffinityPurchase1562211101341 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "affiliate_purchase" (
 "id" SERIAL NOT NULL,
 "purchaseId" character varying NOT NULL,
 "aid" integer NOT NULL,
 "pid" integer NOT NULL,
 "sid" character varying NOT NULL,
 CONSTRAINT "PK_6cae60051766ba1681ea1d5cf91" PRIMARY KEY ("id")
 )`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "affiliate_purchase"`);
    }

}
