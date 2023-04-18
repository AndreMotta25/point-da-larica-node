import { Delivery } from '../entities/Delivery';
import { Order } from '../entities/Order';

export interface IDeliveryDTO {
  adress: string;
  order: Order;
}
interface IDeliveryRepository {
  create({ adress, order }: IDeliveryDTO): Promise<void>;
  getOrderDelivery(id: string): Promise<Delivery | null>;
}

export { IDeliveryRepository };
