import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateDoctorService from '@modules/doctors/services/CreateDoctorService';
import CreateAddressService from '@modules/doctors/services/CreateAddressService';
import UpdateDoctorService from '@modules/doctors/services/UpdateDoctorService';
import DeleteDoctorService from '@modules/doctors/services/DeleteDoctorService';
import SelectDoctorService from '@modules/doctors/services/SelectDoctorService';

export default class DoctorsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, crm, landline, medical_specialty, mobile_phone, zip_code } =
      request.body;

    const createAddress = container.resolve(CreateAddressService);

    const doctorAddress = await createAddress.execute(zip_code);

    const createDoctor = container.resolve(CreateDoctorService);

    const doctor = await createDoctor.execute({
      name,
      crm,
      landline,
      medicalSpecialty: medical_specialty,
      mobilePhone: mobile_phone,
      address: doctorAddress,
    });

    return response.status(200).json(doctor);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const { name, crm, landline, medical_specialty, mobile_phone, zip_code } =
      request.body;

    const updateDoctor = container.resolve(UpdateDoctorService);

    const doctor = await updateDoctor.execute({
      id,
      name,
      crm,
      landline,
      medicalSpecialty: medical_specialty,
      mobilePhone: mobile_phone,
      zipCode: zip_code,
    });

    return response.json(doctor);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteDoctor = container.resolve(DeleteDoctorService);

    const doctor = await deleteDoctor.execute(id);

    return response.status(204).json(doctor);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const {
      name,
      crm,
      landline,
      mobile_phone,
      zip_code,
      state,
      city,
      street,
      medical_specialty,
    } = request.query as Record<string, string | undefined>;

    const findDoctorsByFilter = container.resolve(SelectDoctorService);

    const doctors = await findDoctorsByFilter.execute({
      name,
      crm,
      landline,
      mobilePhone: mobile_phone,
      cep: zip_code,
      state,
      city,
      street,
      medicalSpecialty: medical_specialty,
    });

    return response.status(200).json(doctors);
  }
}
