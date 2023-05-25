import { NextFunction, Request, Response } from 'express';

import { Permission } from '@modules/users/entities/Permission';

const hasPermission = (action: string) => {
  const hasAction = (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const { roles } = request.user;

    const actionExists = roles
      .reduce((acc: Permission[], r) => {
        return [...acc, ...r.permissions];
      }, [])
      .map((p) => p.name)
      .some((p) => p.includes(action));

    if (actionExists) {
      return next();
    }
    return response.status(401).json({ message: 'User Not Authorized' });
  };

  return hasAction;
};
export { hasPermission };
