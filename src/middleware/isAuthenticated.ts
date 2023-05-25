import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '@errors/AppError';
import { EmployerRepository } from '@modules/users/repositories/implementations/EmployerRepository';

interface IJwt {
  subject: string;
}

const isAuthenticated = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { authorization } = request.headers;

  if (!authorization) throw new AppError('Falta o token', 401);

  const [, token] = authorization.split(' ');
  try {
    const { subject } = verify(
      token,
      'b5b037a78522671b89a2c1b21d9b80c6'
    ) as IJwt;

    const employerRepository = new EmployerRepository();
    const employer = await employerRepository.findById(subject);

    if (!employer) throw new AppError('Usuario não achado', 401);

    request.user = {
      id: employer.id,
      roles: employer.roles,
    };

    return next();
  } catch {
    throw new AppError('Token Invalido', 401);
  }
};
export { isAuthenticated };
