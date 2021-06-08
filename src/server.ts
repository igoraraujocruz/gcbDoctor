import './shared/infra/typeorm';
import express from 'express';

require('dotenv/config');

const app = express();

app.get('/', (request, response) =>
  response.json({
    message: process.env.APP_NAME,
  }),
);

app.listen(process.env.APP_PORT, () => {
  console.log(`Server started on port ${process.env.APP_PORT}`);
});
