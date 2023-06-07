import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { Delivery } from './Delivery';
import { OrderList } from './OrderList';
import { Product } from './Product';

@Entity('Orders')
class Order {
  @PrimaryColumn()
  id: string;

  @Column('decimal', { precision: 18, scale: 2 })
  full_value: number;

  @Column('decimal', { precision: 18, scale: 2 })
  discount: number;

  @Column('decimal', { precision: 18, scale: 2 })
  discount_price: number;

  @CreateDateColumn({ type: 'timestamp with time zone' })
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

  @OneToOne(() => Delivery, (delivery) => delivery.order)
  delivery: Delivery;

  @Column({ default: false })
  isDelivery: boolean;

  @Column({ default: false })
  schedule: boolean;

  @Column({ type: 'timestamp without time zone' })
  schedule_date: Date;

  constructor() {
    this.id = uuidV4();
    this.schedule = false;
    this.schedule_date = new Date();
  }
}

export { Order };
