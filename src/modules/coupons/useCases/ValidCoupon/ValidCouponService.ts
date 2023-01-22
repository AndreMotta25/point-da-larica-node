import { inject, injectable } from 'tsyringe';

import ErrorField from '../../../errors/ErrorField';
import Coupon from '../../entities/Coupon';
import ICouponRepository from '../../repositories/ICouponRepository';

@injectable()
class ValidCouponService {
  constructor(
    @inject('CouponRepository') private repository: ICouponRepository
  ) {}

  async execute(code: string): Promise<Coupon> {
    const coupon = await this.repository.getCoupon(code);

    if (!coupon) throw new ErrorField(code, 'Cupom Invalido', 'cupom');

    if (!coupon.valid || coupon.expire_at < new Date() || coupon.amount <= 0)
      throw new ErrorField(code, 'Esse cupom não é mais valido', 'cupom');

    return coupon;
  }
}

export default ValidCouponService;
