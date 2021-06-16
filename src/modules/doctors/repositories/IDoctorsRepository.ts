import Doctor from '@modules/doctors/infra/typeorm/entities/Doctor';
import DoctorDTO from '@modules/doctors/dtos/DoctorDTO';

export default interface IDoctorsRepository {
  create(data: Partial<Doctor>): Promise<Doctor>;
  update(data: DoctorDTO): Promise<Doctor>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Doctor | undefined>;
}
