import { container, Lifecycle } from 'tsyringe';

import { IDeliveryRepository } from '@modules/orders/repositories/IDeliveryRepository';
import { DeliveryRepository } from '@modules/orders/repositories/implementations/DeliveryRepository';
import { OrderListRepository } from '@modules/orders/repositories/implementations/OrderListRepository';
import { OrderRepository } from '@modules/orders/repositories/implementations/OrderRepository';
import { ProductRepository } from '@modules/orders/repositories/implementations/ProductRepository';
import { IOrderListRepository } from '@modules/orders/repositories/IOrderListRepository';
import { IOrderRepository } from '@modules/orders/repositories/IOrderRepository';
import { IProductRepository } from '@modules/orders/repositories/IProductRepository';

import CodeGenerator from '../../modules/coupons/providers/implementations/CodeGenerator';
import ICodeGenerator from '../../modules/coupons/providers/interfaces/ICodeGenerator';
import ICouponRepository from '../../modules/coupons/repositories/ICouponRepository';
import CouponRepository from '../../modules/coupons/repositories/implementations/CouponRepository';

container.register<ICodeGenerator>('CodeGenerator', CodeGenerator);
container.registerSingleton<ICouponRepository>(
  'CouponRepository',
  CouponRepository
);
container.registerSingleton<IProductRepository>(
  'ProductRepository',
  ProductRepository
);

container.registerSingleton<IOrderRepository>(
  'OrderRepository',
  OrderRepository
);

container.registerSingleton<IOrderListRepository>(
  'OrderListRepository',
  OrderListRepository
);

container.registerSingleton<IDeliveryRepository>(
  'DeliveryRepository',
  DeliveryRepository
);
