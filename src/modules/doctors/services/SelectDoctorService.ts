import { inject, injectable } from 'tsyringe';
import IDoctorsRepository from '@modules/doctors/repositories/IDoctorsRepository';
import Doctor from '@modules/doctors/infra/typeorm/entities/Doctor';
import FilterDoctorDTO from '@modules/doctors/dtos/FilterDoctorDTO';

@injectable()
export default class SelectDoctorService {
  constructor(
    @inject('DoctorsRepository')
    private doctorsRepository: IDoctorsRepository,
  ) {}

  public async execute(data: FilterDoctorDTO): Promise<Doctor[]> {
    const doctors = await this.doctorsRepository.findDoctors(data);
    return doctors;
  }
}
