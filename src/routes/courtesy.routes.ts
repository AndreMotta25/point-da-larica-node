import Router from 'express';
import { hasPermission } from 'src/middleware/hasPermission';
import { isAuthenticated } from 'src/middleware/isAuthenticated';

import { CreateCourtesyCardController } from '@modules/courtesy/useCases/CreateCourtesyCard/CreateCourtesyCardController';
import { GetCourtesyCardController } from '@modules/courtesy/useCases/GetCourtesyCard/GetCourtesyCardController';

const courtesyRoutes = Router();

const createCourtesyCardController = new CreateCourtesyCardController();
const getCourtesyController = new GetCourtesyCardController();

courtesyRoutes.post(
  '/',
  isAuthenticated,
  hasPermission('create_courtesy'),
  createCourtesyCardController.handle
);

courtesyRoutes.get(
  '/:id',
  isAuthenticated,
  hasPermission('get_courtesy'),
  getCourtesyController.handle
);

export { courtesyRoutes };
