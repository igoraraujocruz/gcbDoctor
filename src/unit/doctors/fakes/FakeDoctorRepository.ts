import IDoctorsRepository from '@modules/doctors/repositories/IDoctorsRepository';
import Doctor from '@modules/doctors/infra/typeorm/entities/Doctor';
import ICreateDoctorDTO from '@modules/doctors/dtos/ICreateDoctorDTO';
import { uuid } from 'uuidv4';

export default class FakeDoctorRepository implements IDoctorsRepository {
  private doctors: Doctor[] = [];

  public async create(data: ICreateDoctorDTO): Promise<Doctor> {
    const doctor = new Doctor();
    Object.assign(doctor, { id: uuid() }, data);
    this.doctors.push(doctor);

    return doctor;
  }
}
