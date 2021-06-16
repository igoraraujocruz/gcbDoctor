import MedicalSpecialty from '@modules/doctors/infra/typeorm/entities/MedicalSpecialty';
import SelectDoctorService from '@modules/doctors/services/SelectDoctorService';
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
let selectDoctorService: SelectDoctorService;

let medicalSpecialties: MedicalSpecialty[];

const faker = new FakerData();

describe('CreateDoctor', () => {
  beforeAll(async () => {
    fakeMedicalSpecialtyRepository = new FakeMedicalSpecialtyRepository(
      medicalSpecialtiesSeeds,
    );
    medicalSpecialties = await fakeMedicalSpecialtyRepository.index();
  });

  beforeEach(() => {
    fakeDoctorRepository = new FakeDoctorRepository();
    selectDoctorService = new SelectDoctorService(fakeDoctorRepository);
  });

  it('Should be able to select a Doctor', async () => {
    const name = faker.generateName();
    const crm = faker.generateNumber();
    const landline = faker.generatePhoneNumber();
    const medicalSpecialty = [
      medicalSpecialties[1].id,
      medicalSpecialties[2].id,
    ];
    const mobilePhone = faker.generatePhoneNumber();
    const zipCode = faker.generateCep();

    const doctor = await fakeDoctorRepository.create({
      name,
      crm,
      landline,
      medicalSpecialty,
      mobilePhone,
      zipCode,
    });

    const listDoctorSpy = jest.spyOn(fakeDoctorRepository, 'findById');

    await selectDoctorService.execute(doctor.id);

    expect(listDoctorSpy).toHaveBeenCalledWith(doctor);
    expect(listDoctorSpy).toBeCalledTimes(1);
  });

  it('Should not be able to select a doctor if id not exist', async () => {
    await expect(
      selectDoctorService.execute('id not found'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
