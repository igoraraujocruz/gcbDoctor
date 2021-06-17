import { getRepository, Repository } from 'typeorm';
import IDoctorsRepository from '@modules/doctors/repositories/IDoctorsRepository';
import Doctor from '@modules/doctors/infra/typeorm/entities/Doctor';

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

  public async save(doctor: Doctor): Promise<Doctor> {
    return this.ormRepository.save(doctor);
  }
}
