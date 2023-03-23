import { Order } from '../entities/Order';

export interface IRequestOrder {
  full_value: number;
  discount_value: number;
  coupon_code?: string;
  code: string;
}
interface IOrderRepository {
  create({ full_value }: IRequestOrder): Promise<Order>;
}

export { IOrderRepository };
