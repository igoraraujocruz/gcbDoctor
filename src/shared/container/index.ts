import { container } from 'tsyringe';
import IDoctorsRepository from '@modules/doctors/repositories/IDoctorsRepository';
import DoctorsRepository from '@modules/doctors/infra/typeorm/repositories/DoctorsRepository';
import IMedicalSpecialtiesRepository from '@modules/doctors/repositories/IMedicalSpecialtiesRepository';
import MedicalSpecialtiesRepository from '@modules/doctors/infra/typeorm/repositories/MedicalSpecialtiesRepository';
import IAddressRepository from '@modules/doctors/repositories/IAddressRepository';
import AddressRepository from '@modules/doctors/infra/typeorm/repositories/AddressRepository';

container.registerSingleton<IDoctorsRepository>(
  'DoctorsRepository',
  DoctorsRepository,
);

container.registerSingleton<IMedicalSpecialtiesRepository>(
  'MedicalSpecialtiesRepository',
  MedicalSpecialtiesRepository,
);

container.registerSingleton<IAddressRepository>(
  'AddressRepository',
  AddressRepository,
);
