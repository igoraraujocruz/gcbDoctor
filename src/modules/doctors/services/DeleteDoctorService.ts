import { inject, injectable } from 'tsyringe';
import IDoctorsRepository from '@modules/doctors/repositories/IDoctorsRepository';
import AppError from '@shared/errors/AppError';
import IMedicalSpecialtiesRepository from '@modules/doctors/repositories/IMedicalSpecialtiesRepository';

@injectable()
export default class DeleteDoctorService {
  constructor(
    @inject('DoctorsRepository')
    private doctorsRepository: IDoctorsRepository,
    @inject('MedicalSpecialtiesRepository')
    private medicalSpecialtiesRepository: IMedicalSpecialtiesRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const doctor = await this.doctorsRepository.findById(id);
    if (!doctor) {
      throw new AppError('doctor not found');
    }
    await this.doctorsRepository.delete(id);
  }
}
