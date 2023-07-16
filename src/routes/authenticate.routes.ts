import { Router } from 'express';

import { AuthenticateUserController } from '@modules/users/useCases/AuthenticateUser/AuthenticateUserController';
import { authenticateUserValidator } from '@modules/users/validations/authenticateUser.validation';

const authenticaRoutes = Router();

const authenticateController = new AuthenticateUserController();

authenticaRoutes.post(
  '/sign',
  authenticateUserValidator,
  authenticateController.handle
);

export { authenticaRoutes };
