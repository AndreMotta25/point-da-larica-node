import { inject, injectable } from 'tsyringe';

import { IListCouponResponse } from '@modules/coupons/dtos/Response/IListCouponResponse';

import ICouponRepository from '../../repositories/ICouponRepository';

@injectable()
class ListCouponUseCase {
  constructor(
    @inject('CouponRepository') private repository: ICouponRepository
  ) {}

  async execute(): Promise<IListCouponResponse[]> {
    const coupons: IListCouponResponse[] = await (
      await this.repository.getAll()
    ).map((coupon) => {
      return {
        id: coupon.id,
        code: coupon.code,
        value: coupon.value,
        expire_at: coupon.expire_at,
      };
    });
    return coupons;
  }
}

export default ListCouponUseCase;
