import MedicalSpecialty from '../infra/typeorm/entities/MedicalSpecialty';

export default interface IMedicalSpecialtiesRepository {
  findSpecialties(names: string[]): Promise<MedicalSpecialty[]>;
}
