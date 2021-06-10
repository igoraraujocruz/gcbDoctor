import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateDoctorTable1623349328029
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
            type: 'uuid',
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
        foreignKeys: [
          {
            name: 'medical_specialtyForeignKey',
            referencedTableName: 'medical_specialty',
            referencedColumnNames: ['id'],
            columnNames: ['medical_specialty'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('doctors');
  }
}
