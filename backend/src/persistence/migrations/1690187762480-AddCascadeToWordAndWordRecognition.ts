import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCascadeToWordAndWordRecognition1690187762480
  implements MigrationInterface
{
  name = 'AddCascadeToWordAndWordRecognition1690187762480';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`word\` DROP FOREIGN KEY \`FK_f5bb4623b9bd3831fb71fb5a5d3\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`word\` ADD CONSTRAINT \`FK_f5bb4623b9bd3831fb71fb5a5d3\` FOREIGN KEY (\`wordRecognitionId\`) REFERENCES \`word_recognition\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`word\` DROP FOREIGN KEY \`FK_f5bb4623b9bd3831fb71fb5a5d3\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`word\` ADD CONSTRAINT \`FK_f5bb4623b9bd3831fb71fb5a5d3\` FOREIGN KEY (\`wordRecognitionId\`) REFERENCES \`word_recognition\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
