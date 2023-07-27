import { Order } from '../entities/Order';
import { ICreateOrderRequest } from '../useCases/dtos/Request/ICreateOrderRequest';
import { IGetAllOrders } from '../useCases/dtos/Request/IGetAllOrder';
import { ISalesOfWeek } from '../useCases/SalesOfWeek/SalesOfWeekUseCase';
import {
  IGetOrderBy,
  IGetSalesOfWeek,
} from './implementations/OrderRepository';

export type IRequestOrder = Omit<ICreateOrderRequest, 'address' | 'itens'> & {
  full_value: number;
  discount: number;
  final_value: number;
  additionalPayment: number;
  code: string;
};

interface IOrderRepository {
  create(data: IRequestOrder): Promise<Order>;
  getOrders({ limit, page }: IGetAllOrders): Promise<Order[]>;
  getOrder(id: string): Promise<Order | null>;
  getOrderBy(data: IGetOrderBy): Promise<Order[]>;
  getSalesOfWeek({
    minDate,
    maxDate,
  }: IGetSalesOfWeek): Promise<ISalesOfWeek[]>;
}

export { IOrderRepository };
