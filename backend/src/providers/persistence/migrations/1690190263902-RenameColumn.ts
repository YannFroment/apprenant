import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameColumn1690190263902 implements MigrationInterface {
  name = 'RenameColumn1690190263902';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`word\` DROP FOREIGN KEY \`FK_f5bb4623b9bd3831fb71fb5a5d3\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`word\` CHANGE \`wordRecognitionId\` \`word_recognition_id\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`word\` ADD CONSTRAINT \`FK_043e0e3c29cd461d4734219646a\` FOREIGN KEY (\`word_recognition_id\`) REFERENCES \`word_recognition\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`word\` DROP FOREIGN KEY \`FK_043e0e3c29cd461d4734219646a\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`word\` CHANGE \`word_recognition_id\` \`wordRecognitionId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`word\` ADD CONSTRAINT \`FK_f5bb4623b9bd3831fb71fb5a5d3\` FOREIGN KEY (\`wordRecognitionId\`) REFERENCES \`word_recognition\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
