import { Router } from 'express';
import { hasPermission } from 'src/middleware/hasPermission';
import { invalidToken } from 'src/middleware/invalidToken';
import { isAuthenticated } from 'src/middleware/isAuthenticated';
import { isWorking } from 'src/middleware/isWorking';

import { AdditionalPaymentController } from '@modules/orders/useCases/AdditionalPayment/AdditionalPaymentController';
import { CancelOrderController } from '@modules/orders/useCases/CancelOrder/CancelOrderController';
import { CreateOrderController } from '@modules/orders/useCases/CreateOrder/CreateOrderController';
import { GetAllOrderController } from '@modules/orders/useCases/GetAllOrders/GetAllOrderController';
import { GetOrderController } from '@modules/orders/useCases/GetOrder/GetOrderController';
import { ListOrderByController } from '@modules/orders/useCases/ListOrderBy/ListOrderByController';
import { SalesOfWeekController } from '@modules/orders/useCases/SalesOfWeek/SalesOfWeekController';
import { ScheduleOrderController } from '@modules/orders/useCases/ScheduleOrder/ScheduleOrderController';
import { SendOrderController } from '@modules/orders/useCases/SendOrder/SendOrderController';

const orderRoutes = Router();

const createOrderController = new CreateOrderController();
const listBy = new ListOrderByController();
const getOrderController = new GetOrderController();
const sendOrderController = new SendOrderController();
const cancelOrderController = new CancelOrderController();
const scheduleOrderController = new ScheduleOrderController();
const getAllOrder = new GetAllOrderController();
const salesOfWeek = new SalesOfWeekController();
const additionalPayment = new AdditionalPaymentController();

orderRoutes.post(
  '/',
  isAuthenticated,
  hasPermission('register_order'),
  isWorking,
  createOrderController.handler
);

orderRoutes.post(
  '/schedule',
  isAuthenticated,
  hasPermission('register_order'),
  isWorking,
  scheduleOrderController.handler
);

orderRoutes.get(
  '/',
  isAuthenticated,
  hasPermission('get_order'),
  isWorking,
  listBy.handler
);

orderRoutes.get(
  '/salesOfWeek',
  isAuthenticated,
  hasPermission('get_sales_of_week'),
  isWorking,
  salesOfWeek.handle
);

orderRoutes.get(
  '/all',
  isAuthenticated,
  hasPermission('get_order'),
  isWorking,
  getAllOrder.handler
);
orderRoutes.get(
  '/:id',
  isAuthenticated,
  hasPermission('get_order'),
  isWorking,
  getOrderController.handler
);

orderRoutes.patch(
  '/send/:id',
  isAuthenticated,
  hasPermission('send_order'),
  isWorking,
  sendOrderController.handle
);
orderRoutes.patch(
  '/cancel/:id',
  isAuthenticated,
  hasPermission('cancel_order'),
  isWorking,
  cancelOrderController.handle,
  invalidToken
);

orderRoutes.put(
  '/additionalPayment/:id',
  isAuthenticated,
  hasPermission('register_order'),
  isWorking,
  additionalPayment.handle
);

export { orderRoutes };
