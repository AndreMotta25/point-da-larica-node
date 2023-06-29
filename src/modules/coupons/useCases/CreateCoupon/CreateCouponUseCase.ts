import { inject, injectable } from 'tsyringe';

import Coupon from '@modules/coupons/entities/Coupon';

import ICodeGenerator from '../../providers/interfaces/ICodeGenerator';
import ICouponRepository from '../../repositories/ICouponRepository';

interface ICouponRequest {
  value: number;
  amount: number;
  expire_at: Date;
  minimumValue: number;
}

@injectable()
class CreateCouponUseCase {
  constructor(
    @inject('CouponRepository') private repository: ICouponRepository,
    @inject('CodeGenerator') private generator: ICodeGenerator
  ) {}

  async execute({
    value,
    amount,
    expire_at,
    minimumValue,
  }: ICouponRequest): Promise<Coupon> {
    const code = this.generator.generateCode(5);

    const coupon = await this.repository.create({
      value,
      amount,
      expire_at,
      code,
      minimumValue,
    });

    return coupon;
  }
}
export default CreateCouponUseCase;
