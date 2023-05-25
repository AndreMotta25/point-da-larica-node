import { NextFunction, Request, Response } from 'express';

import AppError from '@errors/AppError';

const is = (role: string) => {
  const hasRole = (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const { roles } = request.user;

    const roleExists = roles.some((r) => r.name === role);
    if (roleExists) {
      return next();
    }
    throw new AppError('Acesso proibido', 401);
  };

  return hasRole;
};
export { is };
