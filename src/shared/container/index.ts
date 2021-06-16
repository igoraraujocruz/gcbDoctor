import { container } from 'tsyringe';
import IDoctorsRepository from '@modules/doctors/repositories/IDoctorsRepository';
import DoctorsRepository from '@modules/doctors/infra/typeorm/repositories/DoctorsRepository';
import IMedicalSpecialtiesRepository from '@modules/doctors/repositories/IMedicalSpecialtiesRepository';
import MedicalSpecialtiesRepository from '@modules/doctors/infra/typeorm/repositories/MedicalSpecialtiesRepository';

container.registerSingleton<IDoctorsRepository>(
  'DoctorsRepository',
  DoctorsRepository,
);

container.registerSingleton<IMedicalSpecialtiesRepository>(
  'MedicalSpecialtiesRepository',
  MedicalSpecialtiesRepository,
);
