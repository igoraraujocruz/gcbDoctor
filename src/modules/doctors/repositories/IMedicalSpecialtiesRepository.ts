import MedicalSpecialty from '../infra/typeorm/entities/MedicalSpecialty';

export default interface IMedicalSpecialtiesRepository {
  findAll(): Promise<MedicalSpecialty[]>;
  findSpecialties(names: string[]): Promise<MedicalSpecialty[]>;
}
