import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { OrderList } from './OrderList';
import { Product } from './Product';

@Entity('Orders')
class Order {
  @PrimaryColumn()
  id: string;

  @Column('decimal', { precision: 18, scale: 2 })
  full_value: number;

  @Column('decimal', { precision: 18, scale: 2 })
  discount_value: number;

  @CreateDateColumn()
  data_of_sale: Date;

  @Column({ default: false })
  canceled: boolean;

  @Column()
  code: string;

  @Column({ nullable: true })
  coupon_code: string;

  @ManyToMany(() => Product)
  @JoinTable()
  productList: Product[];

  @OneToMany(() => OrderList, (orderList) => orderList.order)
  orderList: OrderList[];

  constructor() {
    this.id = uuidV4();
  }
}

export { Order };
