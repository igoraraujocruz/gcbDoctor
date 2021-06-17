import Doctor from '@modules/doctors/infra/typeorm/entities/Doctor';

export default interface IDoctorsRepository {
  create(data: Partial<Doctor>): Promise<Doctor>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Doctor | undefined>;
  save(doctor: Doctor): Promise<Doctor>;
}
