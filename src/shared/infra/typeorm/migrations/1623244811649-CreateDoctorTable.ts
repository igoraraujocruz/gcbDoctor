import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateDoctorTable1623244811649
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'doctors',
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
            length: '120',
          },
          {
            name: 'crm',
            type: 'varchar',
            length: '7',
          },
          {
            name: 'landline',
            type: 'varchar',
            length: '10',
          },
          {
            name: 'mobile_phone',
            type: 'varchar',
            length: '11',
          },
          {
            name: 'zip_code',
            type: 'varchar',
            length: '8',
          },
          {
            name: 'medical_specialty',
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
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('doctors');
  }
}
