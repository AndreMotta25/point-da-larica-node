import { Order } from '../entities/Order';
import { ICreateOrderRequest } from '../useCases/dtos/Request/ICreateOrderRequest';
import { IGetAllOrders } from '../useCases/dtos/Request/IGetAllOrder';
import { IListOrderByDateRequest } from '../useCases/dtos/Request/IListOrderByDateRequest';
import { IOrderDeliveryRequest } from '../useCases/dtos/Request/IOrderDeliveryRequest';

export type IRequestOrder = Omit<ICreateOrderRequest, 'adress' | 'itens'> & {
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
  getOrderByDate({
    minDate,
    maxDate,
    date,
    limit,
    page,
  }: IListOrderByDateRequest): Promise<Order[]>;
  getOrderToDelivery({
    date,
    limit,
    page,
  }: IOrderDeliveryRequest): Promise<Order[]>;
}

export { IOrderRepository };
