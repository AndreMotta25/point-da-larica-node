import { Role } from '@modules/users/entities/Role';

declare global {
  // quem vai passar isso para cá, vai ser o middleware de autenticação
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    export interface Request {
      user: {
        id: string;
        roles: Role[];
      };
    }
  }
}
