import { getRepository, Repository } from 'typeorm';
import IDoctorsRepository from '@modules/doctors/repositories/IDoctorsRepository';
import FilterDoctorDTO from '@modules/doctors/dtos/FilterDoctorDTO';
import Doctor from '@modules/doctors/infra/typeorm/entities/Doctor';
import removeNullOrUndefinedProperties from '@shared/utils/removeNullOrUndefinedProperties';

export default class DoctorsRepository implements IDoctorsRepository {
  private ormRepository: Repository<Doctor>;

  constructor() {
    this.ormRepository = getRepository(Doctor);
  }

  public async create(data: Partial<Doctor>): Promise<Doctor> {
    const doctor = this.ormRepository.create(data);
    return this.ormRepository.save(doctor);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.softDelete(id);
  }

  public async findById(id: string): Promise<Doctor | undefined> {
    const findId = await this.ormRepository.findOne({
      where: { id },
      relations: ['medicalSpecialty'],
    });
    return findId;
  }

  public async findDoctors({
    cep,
    state,
    city,
    street,
    ...data
  }: FilterDoctorDTO): Promise<Doctor[]> {
    const parsedData = removeNullOrUndefinedProperties(data);

    const parsedAddressData = removeNullOrUndefinedProperties({
      cep,
      state,
      city,
      street,
    });

    const baseQuery = this.ormRepository
      .createQueryBuilder('doctor')
      .leftJoinAndSelect('doctor.address', 'address')
      .leftJoinAndSelect('doctor.medicalSpecialty', 'medicalSpecialty');

    const parsedAddressDataEntries = Object.entries(parsedAddressData);

    Object.entries(parsedData).forEach(([k, v]) => {
      Object.assign(parsedData, {
        [k]: `${v?.toLowerCase()}%`,
      });
    });

    parsedAddressDataEntries.forEach(([k, v]) => {
      Object.assign(parsedAddressData, {
        [k]: `${v?.toLowerCase()}%`,
      });
    });

    return baseQuery
      .where(
        Object.keys(parsedData)
          .map(k => `LOWER(doctor.${k}) LIKE :${k}`)
          .concat(
            Object.keys(parsedAddressData).map(
              k => `LOWER(address.${k}) LIKE :${k}`,
            ),
          )
          .join(' AND '),
        { ...parsedData, ...parsedAddressData },
      )
      .getMany();
  }

  public async save(doctor: Doctor): Promise<Doctor> {
    return this.ormRepository.save(doctor);
  }
}
