import { Router } from 'express';

import { CreateOrderController } from '@modules/orders/useCases/CreateOrder/CreateOrderController';
import { GetOrderController } from '@modules/orders/useCases/GetOrder/GetOrderController';
import { ListByDeliveriesController } from '@modules/orders/useCases/ListByDeliveries/ListByDeliveriesController';
import { ListOrderByDateController } from '@modules/orders/useCases/ListOrderByDate/ListOrderByDateController';
import { SendOrderController } from '@modules/orders/useCases/SendOrder/SendOrderController';

const orderRoutes = Router();

const createOrderController = new CreateOrderController();
const listByDate = new ListOrderByDateController();
const listByDeliveries = new ListByDeliveriesController();
const getOrderController = new GetOrderController();
const sendOrderController = new SendOrderController();

orderRoutes.post('/', createOrderController.handler);
orderRoutes.get('/date', listByDate.handler);
orderRoutes.get('/deliveries', listByDeliveries.handler);
orderRoutes.get('/:id', getOrderController.handler);
orderRoutes.patch('/send/:id', sendOrderController.handle);

export { orderRoutes };
