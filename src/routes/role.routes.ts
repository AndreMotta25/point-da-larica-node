import { Router } from 'express';
import { hasPermission } from 'src/middleware/hasPermission';
import { is } from 'src/middleware/is';
import { isAuthenticated } from 'src/middleware/isAuthenticated';
import { isWorking } from 'src/middleware/isWorking';

import { AssignPermitionsController } from '@modules/users/useCases/AssignPermitions/AssignPermitionsController';
import { CreateRoleController } from '@modules/users/useCases/CreateRole/CreateRoleController';
import { GetRolesController } from '@modules/users/useCases/GetRoles/GetRolesController';
import { assignPermitionsValidator } from '@modules/users/validations/assignPermitions.validation';
import { createRoleValidator } from '@modules/users/validations/createRole.validation';

const roleRoutes = Router();

const rolePostController = new CreateRoleController();
const assignPermitionController = new AssignPermitionsController();
const getRolesController = new GetRolesController();

roleRoutes.post(
  '/',
  createRoleValidator,
  isAuthenticated,
  is('admin'),
  rolePostController.handle
);
roleRoutes.post(
  '/:id',
  assignPermitionsValidator,
  isAuthenticated,
  is('admin'),
  assignPermitionController.handle
);
roleRoutes.get(
  '/',
  isAuthenticated,
  hasPermission('get_role'),
  isWorking,
  getRolesController.handle
);

export { roleRoutes };
