import { inject, injectable } from 'tsyringe';

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
      throw new Error('Cupom invalido');
    }
    coupon.valid = false;
    await this.repository.save(coupon);
  }
}

export default InvalidCouponService;
