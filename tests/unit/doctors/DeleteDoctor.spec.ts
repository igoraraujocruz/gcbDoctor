import DeleteDoctorService from '@modules/doctors/services/DeleteDoctorService';
import CreateDoctorService from '@modules/doctors/services/CreateDoctorService';
import FakeDoctorRepository from './fakes/FakeDoctorRepository';
import FakerData from '../../utils/FakerData';

let fakeDoctorRepository: FakeDoctorRepository;
let deleteDoctorService: DeleteDoctorService;
let createDoctorService: CreateDoctorService;

const faker = new FakerData();

describe('Delete Doctor', () => {
  beforeEach(() => {
    fakeDoctorRepository = new FakeDoctorRepository();
    deleteDoctorService = new DeleteDoctorService(fakeDoctorRepository);
  });

  it('Should be able to register the doctor', async () => {
    const name = faker.generateName();
    const crm = faker.generateNumber();
    const landline = faker.generatePhoneNumber();
    const medicalSpecialty = [faker.generateUuid()];
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
});
