import { Router } from 'express';
import doctorsRouter from '@modules/doctors/infra/http/routes/doctors.routes';
import specialtiesRouter from '@modules/doctors/infra/http/routes/specialties.routes';

const routes = Router();
routes.use('/doctors', doctorsRouter);
routes.use('/specialties', specialtiesRouter);

export default routes;
