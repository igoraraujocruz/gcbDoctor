import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateDoctorService from '@modules/doctors/services/CreateDoctorService';
import UpdateDoctorService from '@modules/doctors/services/UpdateDoctorService';

export default class DoctorsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, crm, landline, medical_specialty, mobile_phone, zip_code } =
      request.body;

    const createDoctor = container.resolve(CreateDoctorService);

    const doctor = await createDoctor.execute({
      name,
      crm,
      landline,
      medicalSpecialty: medical_specialty,
      mobilePhone: mobile_phone,
      zipCode: zip_code,
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
}
