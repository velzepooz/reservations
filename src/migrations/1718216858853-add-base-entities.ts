import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBaseEntities1718216858853 implements MigrationInterface {
  name = 'AddBaseEntities1718216858853';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "amenity" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_f981de7b1a822823e5f31da10dc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "reservation" ("id" SERIAL NOT NULL, "amenityId" integer NOT NULL, "userId" integer NOT NULL, "startTime" integer NOT NULL, "endTime" integer NOT NULL, "date" bigint NOT NULL, CONSTRAINT "CHK_763323b02de7f4b6aa2e21cd90" CHECK ("date" >= 0), CONSTRAINT "CHK_901626ce00b16fbb7b42ba27a5" CHECK ("endTime" > "startTime"), CONSTRAINT "CHK_85afe8b662f8db992ce65df100" CHECK ("endTime" < 1440), CONSTRAINT "CHK_6d38b706445af26bd87a174517" CHECK ("endTime" >= 0), CONSTRAINT "CHK_ed5c941273790ec3efe35c41f0" CHECK ("startTime" < 1440), CONSTRAINT "CHK_985e293e70567dd71c797452a6" CHECK ("startTime" >= 0), CONSTRAINT "PK_48b1f9922368359ab88e8bfa525" PRIMARY KEY ("id"))`,
      await queryRunner.query(
        `CREATE INDEX "idx_date" ON "reservation" ("date") `,
      ),
    );
    await queryRunner.query(
      `ALTER TABLE "reservation" ADD CONSTRAINT "FK_529dceb01ef681127fef04d755d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation" ADD CONSTRAINT "FK_76588699c8b3502288baa1ac1cf" FOREIGN KEY ("amenityId") REFERENCES "amenity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reservation" DROP CONSTRAINT "FK_76588699c8b3502288baa1ac1cf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation" DROP CONSTRAINT "FK_529dceb01ef681127fef04d755d"`,
    );
    await queryRunner.query(`DROP INDEX "public"."idx_date"`);
    await queryRunner.query(`DROP TABLE "reservation"`);
    await queryRunner.query(`DROP TABLE "amenity"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
