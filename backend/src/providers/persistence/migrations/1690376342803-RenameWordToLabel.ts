import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameWordToLabel1690376342803 implements MigrationInterface {
  name = 'RenameWordToLabel1690376342803';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`word\` CHANGE \`word\` \`label\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`word\` DROP COLUMN \`label\``);
    await queryRunner.query(
      `ALTER TABLE \`word\` ADD \`label\` varchar(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`word\` DROP COLUMN \`label\``);
    await queryRunner.query(
      `ALTER TABLE \`word\` ADD \`label\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`word\` CHANGE \`label\` \`word\` varchar(255) NOT NULL`,
    );
  }
}
