import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import '@shared/infra/typeorm';
import '@shared/container';
import routes from '@shared/infra/http/routes';
import AppError from '@shared/errors/AppError';
import { isCelebrateError } from 'celebrate';
import swaggerUI from 'swagger-ui-express';
import * as swaggerDocument from '@shared/infra/swagger/swagger.json';

const app = express();

app.use(express.json());
app.use(routes);
app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use((error: Error, _: Request, response: Response, __: NextFunction) => {
  if (error instanceof AppError) {
    const { statusCode } = error;

    return response.status(statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  if (isCelebrateError(error)) {
    const values = error.details.values();
    let { message } = values.next().value.details[0];
    message = message.replace('"', '').replace('"', '');

    return response.status(400).json({
      status: 'error',
      type: 'validation',
      message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: error.message,
  });
});

app.listen(process.env.APP_PORT, () => {
  console.log(`Server started on port ${process.env.APP_PORT}`);
});
