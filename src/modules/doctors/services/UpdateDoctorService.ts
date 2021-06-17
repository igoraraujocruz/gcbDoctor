import { inject, injectable } from 'tsyringe';
import Doctor from '@modules/doctors/infra/typeorm/entities/Doctor';
import IDoctorsRepository from '@modules/doctors/repositories/IDoctorsRepository';
import UpdateDoctorDTO from '@modules/doctors/dtos/UpdateDoctorDTO';
import AppError from '@shared/errors/AppError';

@injectable()
export default class UpdateDoctorService {
  constructor(
    @inject('DoctorsRepository')
    private doctorsRepository: IDoctorsRepository,
  ) {}

  public async execute(doctorData: UpdateDoctorDTO): Promise<Doctor> {
    const doctor = await this.doctorsRepository.findById(doctorData.id);

    if (!doctor) {
      throw new AppError('Doctor not found');
    }

    Object.assign(doctor, { ...doctorData });
    return this.doctorsRepository.save(doctor);
  }
}
