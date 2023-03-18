import { container } from 'tsyringe';

import ICodeGenerator from '../../modules/coupons/providers/interfaces/ICodeGenerator';
import CodeGenerator from '../../modules/coupons/providers/implementations/CodeGenerator';
import ICouponRepository from '../../modules/coupons/repositories/ICouponRepository';
import CouponRepository from '../../modules/coupons/repositories/implementations/CouponRepository';

container.register<ICodeGenerator>('CodeGenerator', CodeGenerator);
container.registerSingleton<ICouponRepository>(
  'CouponRepository',
  CouponRepository
);
