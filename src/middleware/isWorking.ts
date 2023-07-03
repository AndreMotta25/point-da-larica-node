import { NextFunction, Request, Response } from 'express';

const isWorking = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { roles } = request.user;

  const currentTime = new Date().getHours();

  const closed = Number(process.env.CLOSED);
  const open = Number(process.env.OPEN);
  const rolesNames = roles.map((r) => r.name);

  if (
    (currentTime >= open && currentTime < closed) ||
    rolesNames.includes('admin')
  ) {
    return next();
  }
  return response.status(401).json({ msg: 'Fora do horario de funcionamento' });
};

export { isWorking };
