import { Router } from 'express';
import { hasPermission } from 'src/middleware/hasPermission';
import { isAuthenticated } from 'src/middleware/isAuthenticated';

import { AssignRolesController } from '@modules/users/useCases/AssignRoles/AssignRolesController';
import { CreateEmployerController } from '@modules/users/useCases/CreateEmployer/CreateEmployerController';
import { ForgotPasswordController } from '@modules/users/useCases/ForgetPassword/ForgotPasswordController';
import { GetEmployerController } from '@modules/users/useCases/GetEmployer/GetEmployerController';
import { RemoveRolesFromEmployerController } from '@modules/users/useCases/RemoveRolesFromEmployer/RemoveRolesFromEmployerController';
import { ResetPasswordController } from '@modules/users/useCases/ResetPassword/ResetPasswordController';

const employerRoutes = Router();

const createController = new CreateEmployerController();
const assignRoles = new AssignRolesController();
const forgetPassword = new ForgotPasswordController();
const resetPassword = new ResetPasswordController();
const removeRoles = new RemoveRolesFromEmployerController();
const getEmployerController = new GetEmployerController();

employerRoutes.post(
  '/',
  isAuthenticated,
  hasPermission('create_user'),
  createController.handle
);
employerRoutes.post(
  '/:id/assign_roles',
  isAuthenticated,
  hasPermission('assign_role'),
  assignRoles.handle
);
employerRoutes.delete(
  '/:id/remove_roles',
  isAuthenticated,
  hasPermission('remove_role'),
  removeRoles.handle
);

employerRoutes.get('/', isAuthenticated, getEmployerController.handle);

employerRoutes.post('/forget-password', forgetPassword.handle);

employerRoutes.patch('/reset-password/:token', resetPassword.handle);

export { employerRoutes };
