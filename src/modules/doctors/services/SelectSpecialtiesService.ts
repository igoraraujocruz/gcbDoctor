import { inject, injectable } from 'tsyringe';
import IMedicalSpecialtiesRepository from '@modules/doctors/repositories/IMedicalSpecialtiesRepository';
import MedicalSpecialty from '@modules/doctors/infra/typeorm/entities/MedicalSpecialty';

@injectable()
export default class SelectDoctorService {
  constructor(
    @inject('MedicalSpecialtiesRepository')
    private medicalSpecialtiesRepository: IMedicalSpecialtiesRepository,
  ) {}

  public async execute(): Promise<MedicalSpecialty[]> {
    const specialties = await this.medicalSpecialtiesRepository.findAll();

    return specialties;
  }
}
