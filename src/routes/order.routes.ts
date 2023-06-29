import { Router } from 'express';
import { hasPermission } from 'src/middleware/hasPermission';
import { invalidToken } from 'src/middleware/invalidToken';
import { isAuthenticated } from 'src/middleware/isAuthenticated';

import { CancelOrderController } from '@modules/orders/useCases/CancelOrder/CancelOrderController';
import { CreateOrderController } from '@modules/orders/useCases/CreateOrder/CreateOrderController';
import { GetAllOrderController } from '@modules/orders/useCases/GetAllOrders/GetAllOrderController';
import { GetOrderController } from '@modules/orders/useCases/GetOrder/GetOrderController';
import { ListOrderByDateController } from '@modules/orders/useCases/ListOrderByDate/ListOrderByDateController';
import { ScheduleOrderController } from '@modules/orders/useCases/ScheduleOrder/ScheduleOrderController';
import { SendOrderController } from '@modules/orders/useCases/SendOrder/SendOrderController';

const orderRoutes = Router();

const createOrderController = new CreateOrderController();
const listByDate = new ListOrderByDateController();
const getOrderController = new GetOrderController();
const sendOrderController = new SendOrderController();
const cancelOrderController = new CancelOrderController();
const scheduleOrderController = new ScheduleOrderController();
const getAllOrder = new GetAllOrderController();

orderRoutes.post(
  '/',
  isAuthenticated,
  hasPermission('register_order'),
  createOrderController.handler
);

orderRoutes.post('/schedule', scheduleOrderController.handler);

orderRoutes.get(
  '/',
  isAuthenticated,
  hasPermission('get_order'),
  listByDate.handler
);
orderRoutes.get(
  '/all',
  isAuthenticated,
  hasPermission('get_order'),
  getAllOrder.handler
);
orderRoutes.get(
  '/:id',
  isAuthenticated,
  hasPermission('get_order'),
  getOrderController.handler
);

orderRoutes.patch(
  '/send/:id',
  isAuthenticated,
  hasPermission('send_order'),
  sendOrderController.handle
);
orderRoutes.patch(
  '/cancel/:id',
  isAuthenticated,
  hasPermission('cancel_order'),
  cancelOrderController.handle,
  invalidToken
);

export { orderRoutes };
