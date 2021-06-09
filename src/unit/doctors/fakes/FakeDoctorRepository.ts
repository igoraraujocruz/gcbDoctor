import IDoctorsRepository from '@modules/doctors/repositories/IDoctorsRepository';
import Doctor from '@modules/doctors/infra/typeorm/entities/Doctor';
import IDoctorDTO from '@modules/doctors/dtos/IDoctorDTO';
import { uuid } from 'uuidv4';

export default class FakeDoctorRepository implements IDoctorsRepository {
  private doctors: Doctor[] = [];

  public async create(data: IDoctorDTO): Promise<Doctor> {
    const doctor = new Doctor();
    Object.assign(doctor, { id: uuid() }, data);
    this.doctors.push(doctor);

    return doctor;
  }

  public async update(data: IDoctorDTO): Promise<Doctor> {
    const doctor = new Doctor();
    Object.assign(doctor, { id: uuid() }, data);
    this.doctors.push(doctor);

    return doctor;
  }
}
