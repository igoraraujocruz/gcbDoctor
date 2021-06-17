import { inject, injectable } from 'tsyringe';
import Doctor from '@modules/doctors/infra/typeorm/entities/Doctor';
import IDoctorsRepository from '@modules/doctors/repositories/IDoctorsRepository';
import IMedicalSpecialtiesRepository from '@modules/doctors/repositories/IMedicalSpecialtiesRepository';
import CreateDoctorDTO from '@modules/doctors/dtos/CreateDoctorDTO';
import AppError from '@shared/errors/AppError';

@injectable()
export default class CreateDoctorService {
  constructor(
    @inject('DoctorsRepository')
    private doctorsRepository: IDoctorsRepository,

    @inject('MedicalSpecialtiesRepository')
    private medicalSpecialtiesRepository: IMedicalSpecialtiesRepository,
  ) {}

  public async execute({
    name,
    crm,
    landline,
    medicalSpecialty,
    mobilePhone,
    address,
  }: CreateDoctorDTO): Promise<Doctor> {
    const findSpecialties =
      await this.medicalSpecialtiesRepository.findSpecialties(medicalSpecialty);

    if (findSpecialties.length !== medicalSpecialty.length) {
      throw new AppError('Speciality not found');
    }

    if (findSpecialties.length < 2) {
      throw new AppError('It takes at least two specialties');
    }

    if (typeof landline && typeof mobilePhone !== 'number') {
      throw new AppError('must be a number');
    }

    const doctor = await this.doctorsRepository.create({
      name,
      crm,
      landline,
      medicalSpecialty: findSpecialties,
      mobilePhone,
      address,
    });

    return doctor;
  }
}
