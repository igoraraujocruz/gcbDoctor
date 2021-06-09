import { inject, injectable } from 'tsyringe';
import Doctor from '@modules/doctors/infra/typeorm/entities/Doctor';
import IDoctorsRepository from '@modules/doctors/repositories/IDoctorsRepository';
import IDoctorDTO from '@modules/doctors/dtos/IDoctorDTO';
import AppError from '@shared/errors/AppError';

@injectable()
export default class CreateDoctorService {
  constructor(
    @inject('DoctorsRepository')
    private doctorsRepository: IDoctorsRepository,
  ) {}

  public async execute({
    name,
    crm,
    landline,
    medicalSpecialty,
    mobilePhone,
    zipCode,
  }: IDoctorDTO): Promise<Doctor> {
    if (name.length > 120) {
      throw new AppError('name must contain fewer characters');
    }
    if (crm.toString().length > 7) {
      throw new AppError('crm must contain fewer characters');
    }
    if (typeof landline && typeof mobilePhone !== 'number') {
      throw new AppError('must be a number');
    }
    const doctor = await this.doctorsRepository.create({
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
