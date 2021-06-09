import { Router } from 'express';
import DoctorsController from '@modules/doctors/infra/http/controllers/DoctorsController';

const doctorsRouter = Router();
const doctorsController = new DoctorsController();

doctorsRouter.post('/', doctorsController.create);

export default doctorsRouter;
