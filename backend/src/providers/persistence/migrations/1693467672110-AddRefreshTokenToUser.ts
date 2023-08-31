import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRefreshTokenToUser1693467672110 implements MigrationInterface {
  name = 'AddRefreshTokenToUser1693467672110';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`refresh_token\` varchar(255) NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP COLUMN \`refresh_token\``,
    );
  }
}
