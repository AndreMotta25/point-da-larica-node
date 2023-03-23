import { Order } from '../entities/Order';
import { Product } from '../entities/Product';

export interface IOrderListDTO {
  order: Order;
  product: Product;
  amount: number;
  total: number;
}

interface IOrderListRepository {
  create(data: IOrderListDTO): Promise<void>;
}

export { IOrderListRepository };
