import UpdateDoctorService from '@modules/doctors/services/UpdateDoctorService';
import MedicalSpecialty from '@modules/doctors/infra/typeorm/entities/MedicalSpecialty';
import FakeDoctorRepository from './fakes/FakeDoctorRepository';
import FakerData from '../../utils/FakerData';
import FakeMedicalSpecialtyRepository from './fakes/FakeMedicalSpecialtyRepository';

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
let updateDoctorService: UpdateDoctorService;

let medicalSpecialties: MedicalSpecialty[];

const faker = new FakerData();

describe('UpdateDoctor', () => {
  beforeAll(async () => {
    fakeMedicalSpecialtyRepository = new FakeMedicalSpecialtyRepository(
      medicalSpecialtiesSeeds,
    );
    medicalSpecialties = await fakeMedicalSpecialtyRepository.findAll();
  });

  beforeEach(() => {
    fakeDoctorRepository = new FakeDoctorRepository();
    updateDoctorService = new UpdateDoctorService(
      fakeDoctorRepository,
      fakeMedicalSpecialtyRepository,
    );
  });

  it('Should be able to update the doctor', async () => {
    const doctor = await fakeDoctorRepository.create({
      id: faker.generateUuid(),
      name: faker.generateName(),
      crm: faker.generateNumber(),
      landline: faker.generatePhoneNumber(),
      medicalSpecialty: [medicalSpecialties[0].id, medicalSpecialties[1].id],
      mobilePhone: faker.generatePhoneNumber(),
      zipCode: faker.generateCep(),
    });

    const name = faker.generateName();
    const crm = faker.generateNumber();
    const landline = faker.generatePhoneNumber();
    const medicalSpecialty = [
      medicalSpecialties[2].id,
      medicalSpecialties[3].id,
    ];
    const mobilePhone = faker.generatePhoneNumber();
    const zipCode = faker.generateCep();

    const updateDoctor = await updateDoctorService.execute({
      id: doctor.id,
      name,
      crm,
      landline,
      medicalSpecialty,
      mobilePhone,
      zipCode,
    });

    expect(updateDoctor.name).toEqual(name);
    expect(updateDoctor.crm).toEqual(crm);
    expect(updateDoctor.landline).toEqual(landline);
    expect(updateDoctor.medicalSpecialty).toEqual(medicalSpecialty);
    expect(updateDoctor.mobilePhone).toEqual(mobilePhone);
    expect(updateDoctor.zipCode).toEqual(zipCode);
  });
});
