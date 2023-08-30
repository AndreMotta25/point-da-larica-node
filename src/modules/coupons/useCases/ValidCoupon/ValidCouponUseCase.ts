import { inject, injectable } from 'tsyringe';

import ErrorField from '@errors/ErrorField';
import { IValidCouponResponse } from '@modules/coupons/dtos/Response/IValidCouponResponse';

import ICouponRepository from '../../repositories/ICouponRepository';

@injectable()
class ValidCouponUseCase {
  constructor(
    @inject('CouponRepository') private repository: ICouponRepository
  ) {}

  async execute(code: string): Promise<IValidCouponResponse> {
    const coupon = await this.repository.getCoupon(code);

    if (!coupon) throw new ErrorField(code, 'Cupom Invalido', 'cupom', 404);

    if (!coupon.valid || coupon.expire_at < new Date() || coupon.amount <= 0)
      throw new ErrorField(code, 'Esse cupom não é mais valido', 'cupom');

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

export default ValidCouponUseCase;
