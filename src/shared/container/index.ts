import { container } from 'tsyringe';

import CodeGenerator from '../../modules/coupons/entities/CodeGenerator';
import ICodeGenerator from '../../modules/coupons/interfaces/ICodeGenerator';
import ICouponRepository from '../../modules/coupons/repositories/ICouponRepository';
import CouponRepository from '../../modules/coupons/repositories/implementations/CouponRepository';

container.register<ICodeGenerator>('CodeGenerator', CodeGenerator);
container.registerSingleton<ICouponRepository>(
  'CouponRepository',
  CouponRepository
);
