import CreateDoctorService from '@modules/doctors/services/CreateDoctorService';
import AppError from '@shared/errors/AppError';
import FakeDoctorRepository from './fakes/FakeDoctorRepository';
import FakerData from '../../utils/FakerData';

let fakeDoctorRepository: FakeDoctorRepository;
let createDoctorService: CreateDoctorService;

const faker = new FakerData();

describe('CreateDoctor', () => {
  beforeEach(() => {
    fakeDoctorRepository = new FakeDoctorRepository();
    createDoctorService = new CreateDoctorService(fakeDoctorRepository);
  });

  it('Should be able to register the doctor', async () => {
    const name = faker.generateName();
    const crm = faker.generateNumber();
    const landline = faker.generatePhoneNumber();
    const medicalSpecialty = faker.generateUuid();
    const mobilePhone = faker.generatePhoneNumber();
    const zipCode = faker.generateCep();

    const doctor = await createDoctorService.execute({
      name,
      crm,
      landline,
      medicalSpecialty: [],
      mobilePhone,
      zipCode,
    });

    expect(doctor.name).toEqual(name);
    expect(doctor.crm).toEqual(crm);
    expect(doctor.landline).toEqual(landline);
    expect(doctor.medicalSpecialty).toEqual(medicalSpecialty);
    expect(doctor.mobilePhone).toEqual(mobilePhone);
    expect(doctor.zipCode).toEqual(zipCode);
  });

  it('Should not be able to register the doctor if the name is longer than 120 characters', async () => {
    const name = faker.generateName();
    const crm = faker.generateNumber();
    const landline = faker.generatePhoneNumber();
    const medicalSpecialty = [faker.generateUuid()];
    const mobilePhone = faker.generatePhoneNumber();
    const zipCode = faker.generateCep();

    await fakeDoctorRepository.create({
      name,
      crm,
      landline,
      medicalSpecialty,
      mobilePhone,
      zipCode,
    });

    await expect(
      createDoctorService.execute({
        name,
        crm,
        landline,
        medicalSpecialty: [],
        mobilePhone,
        zipCode,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
