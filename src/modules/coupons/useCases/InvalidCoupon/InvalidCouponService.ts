import { inject, injectable } from 'tsyringe';

import AppError from '@errors/AppError';

import ICouponRepository from '../../repositories/ICouponRepository';

@injectable()
class InvalidCouponService {
  private readonly repository: ICouponRepository;

  constructor(@inject('CouponRepository') repository: ICouponRepository) {
    this.repository = repository;
  }

  async execute(id: string) {
    const coupon = await this.repository.findById(id);

    if (!coupon) {
      throw new AppError('Cupom invalido', 404);
    }
    coupon.valid = false;
    await this.repository.create(coupon); // update
  }
}

export default InvalidCouponService;
