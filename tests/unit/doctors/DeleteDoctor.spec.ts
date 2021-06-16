import DeleteDoctorService from '@modules/doctors/services/DeleteDoctorService';
import CreateDoctorService from '@modules/doctors/services/CreateDoctorService';
import MedicalSpecialty from '@modules/doctors/infra/typeorm/entities/MedicalSpecialty';
import AppError from '@shared/errors/AppError';
import FakeMedicalSpecialtyRepository from './fakes/FakeMedicalSpecialtyRepository';
import FakeDoctorRepository from './fakes/FakeDoctorRepository';
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
let deleteDoctorService: DeleteDoctorService;
let createDoctorService: CreateDoctorService;

let medicalSpecialties: MedicalSpecialty[];

const faker = new FakerData();

describe('Delete Doctor', () => {
  beforeAll(async () => {
    fakeMedicalSpecialtyRepository = new FakeMedicalSpecialtyRepository(
      medicalSpecialtiesSeeds,
    );
    medicalSpecialties = await fakeMedicalSpecialtyRepository.findAll();
  });

  beforeEach(() => {
    fakeDoctorRepository = new FakeDoctorRepository();
    deleteDoctorService = new DeleteDoctorService(
      fakeDoctorRepository,
      fakeMedicalSpecialtyRepository,
    );
  });

  it('Should be able to delete a doctor', async () => {
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

    const deleteDoctorSpy = jest.spyOn(fakeDoctorRepository, 'delete');

    await deleteDoctorService.execute(doctor.id);

    expect(deleteDoctorSpy).toHaveBeenCalledWith(doctor);
    expect(deleteDoctorSpy).toBeCalledTimes(1);
  });

  it('Should not be able to delete a doctor if id not exist', async () => {
    await expect(
      deleteDoctorService.execute('id not found'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
