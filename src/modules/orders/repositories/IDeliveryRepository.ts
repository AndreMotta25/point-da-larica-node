import { Delivery } from '../entities/Delivery';
import { Order } from '../entities/Order';

export interface IDeliveryDTO {
  address: string;
  order: Order;
}
interface IDeliveryRepository {
  create({ address, order }: IDeliveryDTO): Promise<void>;
  getOrderDelivery(id: string): Promise<Delivery | null>;
  save(delivery: Delivery): Promise<Delivery>;
}

export { IDeliveryRepository };
