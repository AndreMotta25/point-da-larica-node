import { Router } from 'express';
import { hasPermission } from 'src/middleware/hasPermission';
import { isAuthenticated } from 'src/middleware/isAuthenticated';

import { AuthenticateUserController } from '@modules/users/useCases/AuthenticateUser/AuthenticateUserController';
import { CreateEmployerController } from '@modules/users/useCases/CreateEmployer/CreateEmployerController';

const employerRoutes = Router();

const authenticateController = new AuthenticateUserController();
const createController = new CreateEmployerController();

employerRoutes.post(
  '/',
  isAuthenticated,
  hasPermission('create_user'),
  createController.handle
);

employerRoutes.post('/session', authenticateController.handle);

export { employerRoutes };
