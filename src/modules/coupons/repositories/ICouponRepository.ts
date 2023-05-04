import ICouponDTO from '../dtos/ICouponDTO';
import Coupon from '../entities/Coupon';

interface ICouponRepository {
  create({
    value,
    amount,
    expire_at,
    code,
    minimumValue,
    id,
  }: ICouponDTO): Promise<void>;
  getAll(): Promise<Coupon[]>;
  getCoupon(code: string): Promise<Coupon | null>;
  findById(id: string): Promise<Coupon | null>;
}

export default ICouponRepository;
