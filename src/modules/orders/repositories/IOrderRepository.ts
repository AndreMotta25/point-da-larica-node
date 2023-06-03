import { Order } from '../entities/Order';
import { IListOrderDTO } from '../useCases/ListOrderByDate/ListOrderByDateUseCase';

export interface IRequestOrder {
  full_value: number;
  discount: number;
  discount_price: number;
  coupon_code?: string;
  code: string;
  isDelivery: boolean;
}
export interface IRequestOrderDelivery {
  date?: string;
  page: number;
  limit: number;
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
  getOrderToDelivery({
    date,
    limit,
    page,
  }: IRequestOrderDelivery): Promise<Order[]>;
}

export { IOrderRepository };
