import express from 'express';
import '@shared/infra/typeorm';
import '@shared/container';
import routes from '@shared/infra/http/routes';

const app = express();

app.use(express.json());
app.use(routes);

app.listen(process.env.APP_PORT, () => {
  console.log(`Server started on port ${process.env.APP_PORT}`);
});
