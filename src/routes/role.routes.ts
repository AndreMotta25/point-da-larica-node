import { Router } from 'express';
import { is } from 'src/middleware/is';
import { isAuthenticated } from 'src/middleware/isAuthenticated';

import { AssignPermitionsController } from '@modules/users/useCases/AssignPermitions/AssignPermitionsController';
import { CreateRoleController } from '@modules/users/useCases/CreateRole/CreateRoleController';

const roleRoutes = Router();

const rolePostController = new CreateRoleController();
const assignPermitionController = new AssignPermitionsController();

roleRoutes.post('/', isAuthenticated, is('admin'), rolePostController.handle);
roleRoutes.post(
  '/:id',
  isAuthenticated,
  is('admin'),
  assignPermitionController.handle
);

export { roleRoutes };
