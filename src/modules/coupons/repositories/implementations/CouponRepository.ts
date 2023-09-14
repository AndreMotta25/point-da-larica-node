import { IQueryRunner } from 'src/database/transactions/QueryRunner/IQueryRunner';
import { inject, injectable } from 'tsyringe';
import { Repository } from 'typeorm';

import database from '../../../../database';
import ICouponDTO from '../../dtos/ICouponDTO';
import Coupon from '../../entities/Coupon';
import ICouponRepository from '../ICouponRepository';

@injectable()
class CouponRepository implements ICouponRepository {
  private repository: Repository<Coupon>;

  constructor(@inject('QueryRunner') private runner: IQueryRunner) {
    this.repository = database.getRepository(Coupon);
  }

  async findById(id: string): Promise<Coupon | null> {
    const coupon = await this.repository.findOneBy({ id });
    return coupon;
  }

  async getCoupon(code: string): Promise<Coupon | null> {
    const coupon = await this.repository.findOneBy({
      code: code.toUpperCase(),
    });
    return coupon;
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
    const runnerRepository = this.runner.getRepository(Coupon);
    const coupon = runnerRepository.create({
      code,
      value,
      amount,
      expire_at: new Date(expire_at),
      valid,
      minimumValue,
      id,
    });

    await runnerRepository.save(coupon);
    return coupon;
  }

  async getAll(): Promise<Coupon[]> {
    const cupons = await this.repository.find();
    return cupons;
  }
}

export default CouponRepository;
