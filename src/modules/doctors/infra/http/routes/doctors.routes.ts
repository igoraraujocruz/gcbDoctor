import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import DoctorsController from '@modules/doctors/infra/http/controllers/DoctorsController';

const doctorsRouter = Router();
const doctorsController = new DoctorsController();

doctorsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      crm: Joi.string().required(),
      landline: Joi.string().required(),
      mobile_phone: Joi.string().required(),
      zip_code: Joi.string().required(),
      medical_specialty: Joi.string().required(),
    },
  }),
  doctorsController.create,
);
doctorsRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      crm: Joi.string().required(),
      landline: Joi.string().required(),
      mobile_phone: Joi.string().required(),
      zip_code: Joi.string().required(),
      medical_specialty: Joi.string().required(),
    },
  }),
  doctorsController.update,
);

export default doctorsRouter;
