import { Router } from 'express';
import SpecialtiesController from '@modules/doctors/infra/http/controllers/SpecialtiesController';

const specialtiesRouter = Router();
const specialtiesController = new SpecialtiesController();

specialtiesRouter.get('/', specialtiesController.list);

export default specialtiesRouter;
