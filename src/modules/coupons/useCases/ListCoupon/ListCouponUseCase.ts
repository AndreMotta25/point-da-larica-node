import { inject, injectable } from 'tsyringe';

import Coupon from '../../entities/Coupon';
import ICouponRepository from '../../repositories/ICouponRepository';

@injectable()
class ListCouponUseCase {
  constructor(
    @inject('CouponRepository') private repository: ICouponRepository
  ) {}

  async execute(): Promise<Coupon[]> {
    const coupons = await this.repository.getAll();
    return coupons;
  }
}

export default ListCouponUseCase;
