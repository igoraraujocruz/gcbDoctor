import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateDoctorMedicalSpecialtyTable1623895407794
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'doctors_medical_specialities',
        columns: [
          {
            name: 'doctor_id',
            type: 'uuid',
          },
          {
            name: 'medical_specialty_id',
            type: 'uuid',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['doctor_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'doctors',
          },
          {
            columnNames: ['medical_specialty_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'medical_specialty',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('doctors_medical_specialities');
  }
}
