import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateMedicalSpecialtyTable1623895329503
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'medical_specialty',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
    );
    await queryRunner.query(
      `INSERT INTO medical_specialty (name) VALUES ('Alergologia'), ('Angiologia'), ('Buco maxilo'), ('Cardiologia clínica'), ('Cardiologia infantil'), ('Cirurgia cabeça e pescoço'), ('Cirurgia cardíaca'), ('Cirurgia de tórax')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM medical_specialty
      WHERE name IN ('Alergologia', 'Angiologia', 'Buco maxilo', 'Cardiologia clínica', 'Cardiologia infantil', 'Cirurgia cabeça e pescoço', 'Cirurgia cardíaca', 'Cirurgia de tórax')`,
    );
    await queryRunner.dropTable('medical_specialty');
  }
}
