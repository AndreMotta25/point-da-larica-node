import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { Order } from './Order';
import { Product } from './Product';

@Entity('OrdersList')
class OrderList {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Order, (order) => order.orderList, { nullable: false })
  order: Order;

  @ManyToOne(() => Product, (product) => product.orderList, { nullable: false })
  product: Product;

  @Column('decimal', { precision: 18, scale: 2 })
  total: number;

  @Column()
  amount: number;

  constructor() {
    this.id = uuidV4();
  }
}

export { OrderList };
