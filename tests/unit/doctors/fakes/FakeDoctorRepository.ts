import IDoctorsRepository from '@modules/doctors/repositories/IDoctorsRepository';
import Doctor from '@modules/doctors/infra/typeorm/entities/Doctor';
import DoctorDTO from '@modules/doctors/dtos/DoctorDTO';
import { uuid } from 'uuidv4';

export default class FakeDoctorRepository implements IDoctorsRepository {
  private doctors: Doctor[] = [];

  public async create(data: DoctorDTO): Promise<Doctor> {
    const doctor = new Doctor();
    Object.assign(doctor, { id: uuid() }, data);
    this.doctors.push(doctor);

    return doctor;
  }

  public async update(data: DoctorDTO): Promise<Doctor> {
    const doctor = new Doctor();
    Object.assign(doctor, { id: uuid() }, data);
    this.doctors.push(doctor);

    return doctor;
  }

  public async delete(id: string): Promise<void> {
    const findIndex = this.doctors.findIndex(
      findDoctor => findDoctor.id === id,
    );

    this.doctors[findIndex].deletedAt = new Date();
  }

  public async findById(id: string): Promise<Doctor | undefined> {
    return this.doctors.find(doctor => doctor.id === id);
  }
}
