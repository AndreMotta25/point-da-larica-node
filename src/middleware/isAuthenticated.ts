import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import jwtDecode from 'jwt-decode';

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

  if (!authorization) throw new AppError('Falta o token', 400);

  const [, token] = authorization.split(' ');

  try {
    const { subject } = jwtDecode(token) as IJwt;
    const employerRepository = new EmployerRepository();
    const employer = await employerRepository.findById(subject);

    if (!employer) throw new AppError('Usuario não achado', 401);

    verify(token, employer.hashToken);

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
