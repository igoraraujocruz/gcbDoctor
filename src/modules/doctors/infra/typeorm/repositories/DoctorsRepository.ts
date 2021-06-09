import { getRepository, Repository } from 'typeorm';
import IDoctorsRepository from '@modules/doctors/repositories/IDoctorsRepository';
import Doctor from '@modules/doctors/infra/typeorm/entities/Doctor';
import IDoctorDTO from '@modules/doctors/dtos/IDoctorDTO';

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
  }: IDoctorDTO): Promise<Doctor> {
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

  public async update({
    id,
    name,
    crm,
    landline,
    medicalSpecialty,
    mobilePhone,
    zipCode,
  }: IDoctorDTO): Promise<Doctor> {
    const doctor = await this.ormRepository.findOne({
      where: { id },
    });

    if (!doctor) {
      throw new Error('doctor_id not found');
    }

    doctor.name = name;
    doctor.crm = crm;
    doctor.landline = landline;
    doctor.medicalSpecialty = medicalSpecialty;
    doctor.mobilePhone = mobilePhone;
    doctor.zipCode = zipCode;

    return this.ormRepository.save(doctor);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async findById(id: string): Promise<Doctor | undefined> {
    const findId = await this.ormRepository.findOne({
      where: { id },
    });
    return findId;
  }

  public async save(user: Doctor): Promise<Doctor> {
    return this.ormRepository.save(user);
  }
}
