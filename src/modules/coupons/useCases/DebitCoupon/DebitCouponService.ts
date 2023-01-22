import { container, inject, injectable } from 'tsyringe';

import Coupon from '../../entities/Coupon';
import ICouponRepository from '../../repositories/ICouponRepository';
import ValidCouponService from '../ValidCoupon/ValidCouponService';

@injectable()
class DebitCouponService {
  private repository: ICouponRepository;

  constructor(@inject('CouponRepository') repository: ICouponRepository) {
    this.repository = repository;
  }

  async execute(code: string) {
    // const couponIsValidService = container.resolve(ValidCouponService);

    // const coupon = await couponIsValidService.execute(code);
    const coupon = (await this.repository.getCoupon(code)) as Coupon;

    if (!coupon.valid || coupon.expire_at < new Date() || coupon.amount <= 0)
      throw new Error('Esse cupom não é mais valido');

    if (coupon.amount > 0) coupon.amount -= 1;

    if (coupon.amount <= 0) coupon.valid = false;

    await this.repository.save(coupon);
  }
}

export default DebitCouponService;