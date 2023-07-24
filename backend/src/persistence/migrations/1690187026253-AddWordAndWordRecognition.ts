import { MigrationInterface, QueryRunner } from "typeorm";

export class AddWordAndWordRecognition1690187026253 implements MigrationInterface {
    name = 'AddWordAndWordRecognition1690187026253'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`word_recognition\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`title\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`word\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`word\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, \`wordRecognitionId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`word\` ADD CONSTRAINT \`FK_f5bb4623b9bd3831fb71fb5a5d3\` FOREIGN KEY (\`wordRecognitionId\`) REFERENCES \`word_recognition\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`word\` DROP FOREIGN KEY \`FK_f5bb4623b9bd3831fb71fb5a5d3\``);
        await queryRunner.query(`DROP TABLE \`word\``);
        await queryRunner.query(`DROP TABLE \`word_recognition\``);
    }

}
