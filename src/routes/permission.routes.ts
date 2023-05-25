import { Router } from 'express';

import { CreatePermissionController } from '@modules/users/useCases/CreatePermission/CreatePermissionController';

const permissionRoutes = Router();

const permissionPostController = new CreatePermissionController();

permissionRoutes.post('/', permissionPostController.handle);

export { permissionRoutes };
