import { hash } from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import { v4 } from 'uuid';

import { Employer } from '@modules/users/entities/Employer';
import { EmployerRepository } from '@modules/users/repositories/implementations/EmployerRepository';

const invalidToken = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { id } = request.user;
  const employerRepository = new EmployerRepository();
  const employer = (await employerRepository.findById(id)) as Employer;

  const hashGuid = await hash(v4(), 8);
  employer.hashToken = hashGuid;

  await employerRepository.create(employer);

  return response.status(204).send();
};

export { invalidToken };
