import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SelectSpecialtiesService from '@modules/doctors/services/SelectSpecialtiesService';

export default class SpecialtiesController {
  public async list(request: Request, response: Response): Promise<Response> {
    const listSpecialties = container.resolve(SelectSpecialtiesService);

    const specialties = await listSpecialties.execute();

    return response.json(specialties);
  }
}
