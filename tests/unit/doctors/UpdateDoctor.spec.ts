import UpdateDoctorService from '@modules/doctors/services/UpdateDoctorService';
import { uuid } from 'uuidv4';
import FakeDoctorRepository from './fakes/FakeDoctorRepository';

let fakeDoctorRepository: FakeDoctorRepository;
let updateDoctorService: UpdateDoctorService;

describe('UpdateUser', () => {
  beforeEach(() => {
    fakeDoctorRepository = new FakeDoctorRepository();
    updateDoctorService = new UpdateDoctorService(fakeDoctorRepository);
  });

  it('Should be able to update the doctor', async () => {
    const doctor = await fakeDoctorRepository.create({
      id: uuid(),
      name: 'igor',
      crm: '1651',
      landline: '2733247614',
      medicalSpecialty: 'cirurgiao',
      mobilePhone: '27997998675',
      zipCode: '29032570',
    });

    const name = 'pedro';
    const crm = '1561';
    const landline = '2554848484';
    const medicalSpecialty = '616516516';
    const mobilePhone = '11331531';
    const zipCode = '29218484';

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
