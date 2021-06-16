import CreateDoctorService from '@modules/doctors/services/CreateDoctorService';
import MedicalSpecialty from '@modules/doctors/infra/typeorm/entities/MedicalSpecialty';
import AppError from '@shared/errors/AppError';
import FakeDoctorRepository from './fakes/FakeDoctorRepository';
import FakeMedicalSpecialtyRepository from './fakes/FakeMedicalSpecialtyRepository';
import FakerData from '../../utils/FakerData';

const medicalSpecialtiesSeeds = [
  'Alergologia',
  'Angiologia',
  'Buco maxilo',
  'Cardiologia clínica',
  'Cardiologia infantil',
  'Cirurgia cabeça e pescoço',
  'Cirurgia cardíaca',
  'Cirurgia de tórax',
];

let fakeDoctorRepository: FakeDoctorRepository;
let fakeMedicalSpecialtyRepository: FakeMedicalSpecialtyRepository;
let createDoctorService: CreateDoctorService;

let medicalSpecialties: MedicalSpecialty[];

const faker = new FakerData();

describe('CreateDoctor', () => {
  beforeAll(async () => {
    fakeMedicalSpecialtyRepository = new FakeMedicalSpecialtyRepository(
      medicalSpecialtiesSeeds,
    );
    medicalSpecialties = await fakeMedicalSpecialtyRepository.findAll();
  });

  beforeEach(() => {
    fakeDoctorRepository = new FakeDoctorRepository();
    createDoctorService = new CreateDoctorService(
      fakeDoctorRepository,
      fakeMedicalSpecialtyRepository,
    );
  });

  it('Should be able to register a new doctor', async () => {
    const name = faker.generateName();
    const crm = faker.generateNumber();
    const landline = faker.generatePhoneNumber();
    const medicalSpecialty = [
      medicalSpecialties[1].id,
      medicalSpecialties[2].id,
    ];
    const mobilePhone = faker.generatePhoneNumber();
    const zipCode = faker.generateCep();

    const doctor = await createDoctorService.execute({
      name,
      crm,
      landline,
      medicalSpecialty,
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

  it('Should not be able to register a doctor if name was more then 120 caracters', async () => {
    const name =
      'adsasdadsadadhasuydgausydgasuydgauysdguasydgausygdausygdauysdguasgduyasgdiuaysgduasygduasygduaysgduyasgduyasgduyasgduyasg';
    const crm = faker.generateNumber();
    const landline = faker.generatePhoneNumber();
    const medicalSpecialty = [
      medicalSpecialties[1].id,
      medicalSpecialties[2].id,
    ];
    const mobilePhone = faker.generatePhoneNumber();
    const zipCode = faker.generateCep();

    await expect(
      createDoctorService.execute({
        name,
        crm,
        landline,
        mobilePhone,
        zipCode,
        medicalSpecialty,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to register a doctor if landline or mobilePhone type is different from number', async () => {
    const name = faker.generateName();
    const crm = faker.generateNumber();
    const landline = faker.generatePhoneNumber();
    const medicalSpecialty = [
      medicalSpecialties[1].id,
      medicalSpecialties[2].id,
    ];
    const mobilePhone = faker.generatePhoneNumber();
    const zipCode = faker.generateCep();

    await expect(
      createDoctorService.execute({
        name,
        crm,
        landline,
        mobilePhone,
        zipCode,
        medicalSpecialty,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
