import Router from 'express';
import { hasPermission } from 'src/middleware/hasPermission';
import { isAuthenticated } from 'src/middleware/isAuthenticated';
import { isWorking } from 'src/middleware/isWorking';

import { CreateCourtesyCardController } from '@modules/courtesy/useCases/CreateCourtesyCard/CreateCourtesyCardController';
import { GetCourtesyCardController } from '@modules/courtesy/useCases/GetCourtesyCard/GetCourtesyCardController';

const courtesyRoutes = Router();

const createCourtesyCardController = new CreateCourtesyCardController();
const getCourtesyController = new GetCourtesyCardController();

courtesyRoutes.post(
  '/',
  isAuthenticated,
  hasPermission('create_courtesy'),
  isWorking,
  createCourtesyCardController.handle
);

courtesyRoutes.get(
  '/:id',
  isAuthenticated,
  hasPermission('get_courtesy'),
  isWorking,
  getCourtesyController.handle
);

export { courtesyRoutes };
