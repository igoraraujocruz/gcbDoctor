import { inject, injectable } from 'tsyringe';
import Doctor from '@modules/doctors/infra/typeorm/entities/Doctor';
import IDoctorsRepository from '@modules/doctors/repositories/IDoctorsRepository';
import IMedicalSpecialtiesRepository from '@modules/doctors/repositories/IMedicalSpecialtiesRepository';
import DoctorDTO from '@modules/doctors/dtos/DoctorDTO';
import AppError from '@shared/errors/AppError';
import axios from 'axios';

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
    zipCode,
  }: DoctorDTO): Promise<Doctor> {
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
      zipCode,
    });

    const { data } = await axios(`https://viacep.com.br/ws/${zipCode}/json/`);

    const doctorAndAddress = Object.assign(doctor, data);

    return doctorAndAddress;
  }
}
