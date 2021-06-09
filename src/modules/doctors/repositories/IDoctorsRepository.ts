import Doctor from '@modules/doctors/infra/typeorm/entities/Doctor';
import IDoctorDTO from '@modules/doctors/dtos/IDoctorDTO';

export default interface IDoctorsRepository {
  create(data: IDoctorDTO): Promise<Doctor>;
  update(data: IDoctorDTO): Promise<Doctor>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Doctor | undefined>;
}
