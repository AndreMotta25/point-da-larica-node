import { inject, injectable } from 'tsyringe';

import AppError from '@errors/AppError';
import Coupon from '@modules/coupons/entities/Coupon';

import ICouponRepository from '../../repositories/ICouponRepository';

@injectable()
class DebitCouponService {
  private repository: ICouponRepository;

  constructor(@inject('CouponRepository') repository: ICouponRepository) {
    this.repository = repository;
  }

  async execute(code: string) {
    const coupon = (await this.repository.getCoupon(code)) as Coupon;

    if (!coupon.valid || coupon.expire_at < new Date() || coupon.amount <= 0)
      throw new AppError('Esse cupom não é mais valido');

    if (coupon.amount > 0) coupon.amount -= 1;

    if (coupon.amount <= 0) coupon.valid = false;

    await this.repository.create(coupon); // update
  }
}

export default DebitCouponService;
