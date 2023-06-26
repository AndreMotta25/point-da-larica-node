import { Order } from '../entities/Order';
import { ICreateOrderRequest } from '../useCases/dtos/Request/ICreateOrderRequest';
import { IOrderDeliveryRequest } from '../useCases/dtos/Request/IOrderDeliveryRequest';
import { IListOrderDTO } from '../useCases/ListOrderByDate/ListOrderByDateUseCase';

export type IRequestOrder = Omit<ICreateOrderRequest, 'adress' | 'itens'> & {
  full_value: number;
  discount: number;
  discount_price: number;
  additionalPayment: number;
  code: string;
};

interface IOrderRepository {
  create(data: IRequestOrder): Promise<Order>;
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
  }: IOrderDeliveryRequest): Promise<Order[]>;
}

export { IOrderRepository };
