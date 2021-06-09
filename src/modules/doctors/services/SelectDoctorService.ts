import { inject, injectable } from 'tsyringe';
import IDoctorsRepository from '@modules/doctors/repositories/IDoctorsRepository';
import AppError from '@shared/errors/AppError';
import Doctor from '@modules/doctors/infra/typeorm/entities/Doctor';

@injectable()
export default class SelectDoctorService {
  constructor(
    @inject('DoctorsRepository')
    private doctorsRepository: IDoctorsRepository,
  ) {}

  public async execute(id: string): Promise<Doctor> {
    const doctor = await this.doctorsRepository.findById(id);
    if (!doctor) {
      throw new AppError('doctor not found');
    }

    return doctor;
  }
}
