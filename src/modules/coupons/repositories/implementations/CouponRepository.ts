import { Repository } from 'typeorm';

import database from '../../../../database';
import ICouponDTO from '../../dtos/ICouponDTO';
import Coupon from '../../entities/Coupon';
import ICouponRepository from '../ICouponRepository';

class CouponRepository implements ICouponRepository {
  private repository: Repository<Coupon>;

  constructor() {
    this.repository = database.getRepository(Coupon);
  }
  async findById(id: string): Promise<Coupon | null> {
    const coupon = await this.repository.findOneBy({ id });
    return coupon;
  }
  async save(coupon: Coupon): Promise<void> {
    await this.repository.save(coupon);
  }

  async getCoupon(code: string): Promise<Coupon | null> {
    const coupon = await this.repository.findOneBy({ code });
    return coupon;
  }

  async create({
    value,
    amount,
    expire_at,
    code,
    minimumValue,
  }: ICouponDTO): Promise<void> {
    const coupon = this.repository.create({
      code,
      value,
      amount,
      expire_at: new Date(expire_at),
      valid: true,
      minimumValue,
    });
    await this.repository.save(coupon);
  }

  async getAll(): Promise<Coupon[]> {
    const cupons = await this.repository.find();
    return cupons;
  }
}

export default CouponRepository;
