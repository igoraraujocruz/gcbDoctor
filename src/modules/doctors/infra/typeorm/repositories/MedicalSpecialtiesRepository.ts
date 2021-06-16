import { getRepository, Repository } from 'typeorm';
import IMedicalSpecialtiesRepository from '@modules/doctors/repositories/IMedicalSpecialtiesRepository';
import MedicalSpecialty from '@modules/doctors/infra/typeorm/entities/MedicalSpecialty';

export default class MedicalSpecialtiesRepository
  implements IMedicalSpecialtiesRepository
{
  private ormRepository: Repository<MedicalSpecialty>;

  constructor() {
    this.ormRepository = getRepository(MedicalSpecialty);
  }

  public async findAll(): Promise<MedicalSpecialty[]> {
    const specialties = await this.ormRepository.find();
    return specialties;
  }
}
