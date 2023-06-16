import { Router } from 'express';

import { AuthenticateUserController } from '@modules/users/useCases/AuthenticateUser/AuthenticateUserController';

const authenticaRoutes = Router();

const authenticateController = new AuthenticateUserController();

authenticaRoutes.post('/sign', authenticateController.handle);

export { authenticaRoutes };
