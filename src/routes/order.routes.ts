import { Router } from 'express';
import { hasPermission } from 'src/middleware/hasPermission';
import { invalidToken } from 'src/middleware/invalidToken';
import { isAuthenticated } from 'src/middleware/isAuthenticated';
import { isWorking } from 'src/middleware/isWorking';

import { AdditionalPaymentController } from '@modules/orders/useCases/AdditionalPayment/AdditionalPaymentController';
import { CancelOrderController } from '@modules/orders/useCases/CancelOrder/CancelOrderController';
import { CreateOrderController } from '@modules/orders/useCases/CreateOrder/CreateOrderController';
import { GenerateReportController } from '@modules/orders/useCases/GenerateReport/GenerateReportController';
import { GetAllOrderController } from '@modules/orders/useCases/GetAllOrders/GetAllOrderController';
import { GetOrderController } from '@modules/orders/useCases/GetOrder/GetOrderController';
import { ListOrderByController } from '@modules/orders/useCases/ListOrderBy/ListOrderByController';
import { SalesOfWeekController } from '@modules/orders/useCases/SalesOfWeek/SalesOfWeekController';
import { ScheduleOrderController } from '@modules/orders/useCases/ScheduleOrder/ScheduleOrderController';
import { SendOrderController } from '@modules/orders/useCases/SendOrder/SendOrderController';
import { additionalPaymentValidator } from '@modules/orders/validations/additionalPayment.validation';
import { createOrderValidator } from '@modules/orders/validations/createOrder.validation';
import { getAllOrdersValidator } from '@modules/orders/validations/getAllOrders.validation';
import { listOrdersValidator } from '@modules/orders/validations/listOrdersBy.validation';
import { salesOfWeekValidator } from '@modules/orders/validations/salesOfWeek.validation';
import { scheduleOrderValidator } from '@modules/orders/validations/scheduleOrder.validation';
import { sendOrderValidator } from '@modules/orders/validations/sendOrder.validation';
import { verifyOrder as verifyOrderValidator } from '@modules/orders/validations/verifyOrder.validation';

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
const generateReportController = new GenerateReportController();

orderRoutes.post(
  '/',
  createOrderValidator,
  isAuthenticated,
  hasPermission('register_order'),
  isWorking,
  createOrderController.handler
);

orderRoutes.post(
  '/schedule',
  scheduleOrderValidator,
  isAuthenticated,
  hasPermission('register_order'),
  isWorking,
  scheduleOrderController.handler
);

orderRoutes.get(
  '/',
  listOrdersValidator,
  isAuthenticated,
  hasPermission('get_order'),
  isWorking,
  listBy.handler
);
orderRoutes.get(
  '/generate_report',
  isAuthenticated,
  hasPermission('send_mail'),
  isWorking,
  generateReportController.handle
);
orderRoutes.get(
  '/salesOfWeek',
  salesOfWeekValidator,
  isAuthenticated,
  hasPermission('get_sales_of_week'),
  isWorking,
  salesOfWeek.handle
);

orderRoutes.get(
  '/all',
  getAllOrdersValidator,
  isAuthenticated,
  hasPermission('get_order'),
  isWorking,
  getAllOrder.handler
);
orderRoutes.get(
  '/:id',
  verifyOrderValidator(),
  isAuthenticated,
  hasPermission('get_order'),
  isWorking,
  getOrderController.handler
);

orderRoutes.patch(
  '/send/:id',
  sendOrderValidator,
  isAuthenticated,
  hasPermission('send_order'),
  isWorking,
  sendOrderController.handle
);
orderRoutes.patch(
  '/cancel/:id',
  verifyOrderValidator(),
  isAuthenticated,
  hasPermission('cancel_order'),
  isWorking,
  cancelOrderController.handle,
  invalidToken
);

orderRoutes.put(
  '/additionalPayment/:id',
  additionalPaymentValidator,
  isAuthenticated,
  hasPermission('register_order'),
  isWorking,
  additionalPayment.handle
);

export { orderRoutes };
