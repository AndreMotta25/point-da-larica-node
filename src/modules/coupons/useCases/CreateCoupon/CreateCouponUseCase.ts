import { inject, injectable } from 'tsyringe';

import { ICreateCouponResponse } from '@modules/coupons/dtos/Response/ICreateCouponResponse';

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
  }: ICouponRequest): Promise<ICreateCouponResponse> {
    const code = this.generator.generateCode(5);

    const coupon = await this.repository.create({
      value,
      amount,
      expire_at,
      code,
      minimumValue,
    });

    return {
      id: coupon.id,
      code: coupon.code,
      amount: coupon.amount,
      expire_at: coupon.expire_at,
      minimumValue: coupon.minimumValue,
      value: coupon.value,
      valid: coupon.valid,
    };
  }
}
export default CreateCouponUseCase;
