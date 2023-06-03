import { Router } from 'express';
import { hasPermission } from 'src/middleware/hasPermission';
import { isAuthenticated } from 'src/middleware/isAuthenticated';

import { AssignRolesController } from '@modules/users/useCases/AssignRoles/AssignRolesController';
import { AuthenticateUserController } from '@modules/users/useCases/AuthenticateUser/AuthenticateUserController';
import { CreateEmployerController } from '@modules/users/useCases/CreateEmployer/CreateEmployerController';

const employerRoutes = Router();

const authenticateController = new AuthenticateUserController();
const createController = new CreateEmployerController();
const assignRoles = new AssignRolesController();

employerRoutes.post(
  '/',
  isAuthenticated,
  hasPermission('create_user'),
  createController.handle
);
employerRoutes.post('/:id/assign_roles', isAuthenticated, assignRoles.handle);

employerRoutes.post('/session', authenticateController.handle);

export { employerRoutes };
