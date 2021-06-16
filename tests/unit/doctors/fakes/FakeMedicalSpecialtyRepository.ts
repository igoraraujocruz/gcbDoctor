import MedicalSpecialty from '@modules/doctors/infra/typeorm/entities/MedicalSpecialty';

export default class FakeMedicalSpecialtyRepository {
  private medicalSpecialties: MedicalSpecialty[];

  constructor(medicalSpecialtiesSeeds: string[]) {
    this.medicalSpecialties = [];

    medicalSpecialtiesSeeds.forEach(seed => {
      const specialty = new MedicalSpecialty();

      Object.assign(specialty, {
        name: seed,
      });

      this.medicalSpecialties.push(specialty);
    });
  }

  public async findAll(): Promise<MedicalSpecialty[]> {
    return [...this.medicalSpecialties];
  }
}
