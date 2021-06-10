import { MigrationInterface, QueryRunner } from 'typeorm';

export default class InsertDataInToMedicalSpecialtyTable1623351998937
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO medical_specialty (name) VALUES ('Alergologia'), ('Angiologia'), ('Buco maxilo'), ('Cardiologia clínica'), ('Cardiologia infantil'), ('Cirurgia cabeça e pescoço'), ('Cirurgia cardíaca'), ('Cirurgia de tórax')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM medical_specialty
      WHERE name IN ('Alergologia', 'Angiologia', 'Buco maxilo', 'Cardiologia clínica', 'Cardiologia infantil', 'Cirurgia cabeça e pescoço', 'Cirurgia cardíaca', 'Cirurgia de tórax')`,
    );
  }
}
