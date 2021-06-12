import { inject, injectable } from 'tsyringe';
import Doctor from '@modules/doctors/infra/typeorm/entities/Doctor';
import IDoctorsRepository from '@modules/doctors/repositories/IDoctorsRepository';
import DoctorDTO from '@modules/doctors/dtos/DoctorDTO';

@injectable()
export default class UpdateDoctorService {
  constructor(
    @inject('DoctorsRepository')
    private doctorsRepository: IDoctorsRepository,
  ) {}

  public async execute({
    id,
    name,
    crm,
    landline,
    medicalSpecialty,
    mobilePhone,
    zipCode,
  }: DoctorDTO): Promise<Doctor> {
    const doctor = await this.doctorsRepository.update({
      id,
      name,
      crm,
      landline,
      medicalSpecialty,
      mobilePhone,
      zipCode,
    });

    return doctor;
  }
}
