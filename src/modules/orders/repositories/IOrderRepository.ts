import { Order } from '../entities/Order';
import { IListOrderDTO } from '../useCases/ListOrderByDate/ListOrderByDateUseCase';

export interface IRequestOrder {
  full_value: number;
  discount_value: number;
  discounted_value: number;
  coupon_code?: string;
  code: string;
  isDelivery: boolean;
}
interface IOrderRepository {
  create({ full_value }: IRequestOrder): Promise<Order>;
  getOrders(): Promise<Order[]>;
  getOrder(id: string): Promise<Order | null>;
  getOrderByDate({
    minDate,
    maxDate,
    date,
    limit,
    page,
  }: IListOrderDTO): Promise<Order[]>;
}

export { IOrderRepository };
