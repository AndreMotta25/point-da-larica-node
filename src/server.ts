import 'reflect-metadata';
import 'express-async-errors';
import './shared/container';
import 'dotenv/config';

import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import swagger from 'swagger-ui-express';

import swaggerJson from '../swagger-output.json';
import AppError from './errors/AppError';
import ErrorField from './errors/ErrorField';
import router from './routes';

const app = express();

app.use(cors()); // config

app.use(express.json());

app.use('/api-docs', swagger.serve, swagger.setup(swaggerJson));

app.use('/images', express.static(path.resolve(__dirname, '..', 'images')));

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    console.log(err);
    if (err instanceof ErrorField) {
      return response.status(err.statusCode).json({
        errors: [{ value: err.value, msg: err.msg, param: err.param }],
      });
    }
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ msg: err.msg });
    }

    return response.status(500).json({ msg: err.message });
  }
);

app.listen(3333, () => {
  console.log('Server is runnig');
});
