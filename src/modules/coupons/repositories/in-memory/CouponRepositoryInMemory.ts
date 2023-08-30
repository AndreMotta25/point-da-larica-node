import ICouponDTO from '@modules/coupons/dtos/ICouponDTO';
import Coupon from '@modules/coupons/entities/Coupon';

import ICouponRepository from '../ICouponRepository';

class CouponRepositoryInMemory implements ICouponRepository {
  private repository: Coupon[];

  constructor() {
    this.repository = [];
  }

  async create({
    value,
    amount,
    expire_at,
    code,
    minimumValue,
    id,
    valid,
  }: ICouponDTO): Promise<Coupon> {
    let coupon: Coupon;

    if (id) {
      coupon = (await this.findById(id)) as Coupon;
    } else {
      coupon = new Coupon();
    }

    Object.assign(coupon, {
      value,
      amount,
      expire_at,
      code,
      minimumValue,
      valid: valid === undefined || valid,
    });

    if (id && (await this.findById(id))) return coupon; // atualiza

    this.repository.push(coupon); // cria um novo

    return coupon;
  }
  async getAll(): Promise<Coupon[]> {
    return this.repository;
  }
  async getCoupon(code: string): Promise<Coupon | null> {
    return this.repository.find((elem) => elem.code === code) || null;
  }
  async findById(id: string): Promise<Coupon | null> {
    return this.repository.find((elem) => elem.id === id) || null;
  }
}

export { CouponRepositoryInMemory };
