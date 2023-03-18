import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

import './shared/container';

import AppError from './errors/AppError';
import ErrorField from './errors/ErrorField';
import router from './routes';

const app = express();
app.use(express.json());

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof ErrorField) {
      return response.status(err.statusCode).json({
        errors: [{ value: err.value, msg: err.msg, param: err.param }],
      });
    }
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ msg: err.message });
    }

    return response.status(500).json({ message: err.message });
  }
);

app.listen(3333, () => {
  console.log('Server is runnig');
});
