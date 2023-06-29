import { Router } from 'express';
import { hasPermission } from 'src/middleware/hasPermission';
import { is } from 'src/middleware/is';
import { isAuthenticated } from 'src/middleware/isAuthenticated';

import { AssignPermitionsController } from '@modules/users/useCases/AssignPermitions/AssignPermitionsController';
import { CreateRoleController } from '@modules/users/useCases/CreateRole/CreateRoleController';
import { GetRolesController } from '@modules/users/useCases/GetRoles/GetRolesController';

const roleRoutes = Router();

const rolePostController = new CreateRoleController();
const assignPermitionController = new AssignPermitionsController();
const getRolesController = new GetRolesController();

roleRoutes.post('/', isAuthenticated, is('admin'), rolePostController.handle);
roleRoutes.post(
  '/:id',
  isAuthenticated,
  is('admin'),
  assignPermitionController.handle
);
roleRoutes.get(
  '/',
  isAuthenticated,
  hasPermission('get_role'),
  getRolesController.handle
);

export { roleRoutes };
