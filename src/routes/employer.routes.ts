import { Router } from 'express';
import { hasPermission } from 'src/middleware/hasPermission';
import { isAuthenticated } from 'src/middleware/isAuthenticated';
import { isWorking } from 'src/middleware/isWorking';

import { AssignRolesController } from '@modules/users/useCases/AssignRoles/AssignRolesController';
import { CreateEmployerController } from '@modules/users/useCases/CreateEmployer/CreateEmployerController';
import { ForgotPasswordController } from '@modules/users/useCases/ForgetPassword/ForgotPasswordController';
import { GetEmployerController } from '@modules/users/useCases/GetEmployer/GetEmployerController';
import { InactiveEmployerController } from '@modules/users/useCases/InactivateEmployer/InactiveEmployerController';
import { RemoveRolesFromEmployerController } from '@modules/users/useCases/RemoveRolesFromEmployer/RemoveRolesFromEmployerController';
import { ResetPasswordController } from '@modules/users/useCases/ResetPassword/ResetPasswordController';
import { assignRolesValidator } from '@modules/users/validations/assignRoles.validation';
import { createEmployerValidator } from '@modules/users/validations/createEmployer.validation';
import { forgetPasswordValidade } from '@modules/users/validations/forgetPassword.validation';
import { removeRolesFromEmployerValidator } from '@modules/users/validations/removeRolesFromEmployer.validation';
import { resetPasswordValidate } from '@modules/users/validations/resetPassword.validation';
import { verifyUser } from '@modules/users/validations/verifyUser.validation';

const employerRoutes = Router();

const createController = new CreateEmployerController();
const assignRoles = new AssignRolesController();
const forgetPassword = new ForgotPasswordController();
const resetPassword = new ResetPasswordController();
const removeRoles = new RemoveRolesFromEmployerController();
const getEmployerController = new GetEmployerController();
const inactiveEmployerController = new InactiveEmployerController();

employerRoutes.post(
  '/',
  createEmployerValidator,
  isAuthenticated,
  hasPermission('create_user'),
  isWorking,
  createController.handle
);
employerRoutes.post(
  '/:id/assign_roles',
  assignRolesValidator,
  isAuthenticated,
  hasPermission('assign_role'),
  isWorking,
  assignRoles.handle
);
employerRoutes.delete(
  '/:id/remove_roles',
  removeRolesFromEmployerValidator,
  isAuthenticated,
  hasPermission('remove_role'),
  isWorking,
  removeRoles.handle
);

employerRoutes.patch(
  '/:id/fire',
  verifyUser,
  isAuthenticated,
  hasPermission('fire_employer'),
  isWorking,
  inactiveEmployerController.handle
);

employerRoutes.get(
  '/',
  isAuthenticated,
  isWorking,
  getEmployerController.handle
);

employerRoutes.post(
  '/forget-password',
  forgetPasswordValidade,
  forgetPassword.handle
);

employerRoutes.patch(
  '/reset-password/:token',
  resetPasswordValidate,
  resetPassword.handle
);

export { employerRoutes };
