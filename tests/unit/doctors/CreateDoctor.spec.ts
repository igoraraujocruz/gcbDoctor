import CreateDoctorService from '@modules/doctors/services/CreateDoctorService';
import FakeDoctorRepository from './fakes/FakeDoctorRepository';

let fakeDoctorRepository: FakeDoctorRepository;
let createDoctorService: CreateDoctorService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeDoctorRepository = new FakeDoctorRepository();
    createDoctorService = new CreateDoctorService(fakeDoctorRepository);
  });

  it('Should be able to register the doctor', async () => {
    const name = 'igor';
    const crm = '1651';
    const landline = '2733247614';
    const medicalSpecialty = 'cirurgiao';
    const mobilePhone = '27997998675';
    const zipCode = '29032570';

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
});
