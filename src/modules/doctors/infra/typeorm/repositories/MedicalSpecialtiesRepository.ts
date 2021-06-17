import { getRepository, Repository, In } from 'typeorm';
import IMedicalSpecialtiesRepository from '@modules/doctors/repositories/IMedicalSpecialtiesRepository';
import MedicalSpecialty from '@modules/doctors/infra/typeorm/entities/MedicalSpecialty';

export default class MedicalSpecialtiesRepository
  implements IMedicalSpecialtiesRepository
{
  private ormRepository: Repository<MedicalSpecialty>;

  constructor() {
    this.ormRepository = getRepository(MedicalSpecialty);
  }

  public async findSpecialties(names: string[]): Promise<MedicalSpecialty[]> {
    const specialties = this.ormRepository.find({
      where: {
        name: In(names),
      },
    });

    return specialties;
  }
}
