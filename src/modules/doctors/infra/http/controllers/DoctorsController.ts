import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateDoctorService from '@modules/doctors/services/CreateDoctorService';

export default class DoctorsController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, crm, landline, medicalSpecialty, mobilePhone, zipCode } =
        request.body;

      const createDoctor = container.resolve(CreateDoctorService);

      const user = await createDoctor.execute({
        name,
        crm,
        landline,
        medicalSpecialty,
        mobilePhone,
        zipCode,
      });

      return response.status(200).json(user);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
