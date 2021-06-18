import Doctor from '@modules/doctors/infra/typeorm/entities/Doctor';
import FilterDoctorDTO from '@modules/doctors/dtos/FilterDoctorDTO';

export default interface IDoctorsRepository {
  create(data: Partial<Doctor>): Promise<Doctor>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Doctor | undefined>;
  findDoctors(opt: FilterDoctorDTO): Promise<Doctor[]>;
  save(doctor: Doctor): Promise<Doctor>;
}
