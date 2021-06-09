import Doctor from '@modules/doctors/infra/typeorm/entities/Doctor';
import ICreateDoctorDTO from '@modules/doctors/dtos/ICreateDoctorDTO';

export default interface IDoctorsRepository {
  create(data: ICreateDoctorDTO): Promise<Doctor>;
}
