import { getRepository, Repository } from 'typeorm';
import IDoctorsRepository from '@modules/doctors/repositories/IDoctorsRepository';
import Doctor from '@modules/doctors/infra/typeorm/entities/Doctor';
import ICreateDoctorDTO from '@modules/doctors/dtos/ICreateDoctorDTO';

export default class DoctorsRepository implements IDoctorsRepository {
  private ormRepository: Repository<Doctor>;

  constructor() {
    this.ormRepository = getRepository(Doctor);
  }

  public async create({
    name,
    crm,
    landline,
    medicalSpecialty,
    mobilePhone,
    zipCode,
  }: ICreateDoctorDTO): Promise<Doctor> {
    const user = this.ormRepository.create({
      name,
      crm,
      landline,
      medicalSpecialty,
      mobilePhone,
      zipCode,
    });
    await this.ormRepository.save(user);
    return user;
  }

  public async save(user: Doctor): Promise<Doctor> {
    return this.ormRepository.save(user);
  }
}
