import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { OrderList } from './OrderList';

@Entity('Products')
class Product {
  @PrimaryColumn()
  id: string;

  @Column('decimal', { precision: 18, scale: 2, nullable: false })
  value: number;

  @Column({ nullable: false })
  name: string;

  @Column('text')
  description: string;

  @Column('varchar', { nullable: true })
  image: string;

  @OneToMany(() => OrderList, (orderList) => orderList.order)
  orderList: OrderList[];

  constructor() {
    this.id = uuidV4();
  }
}

export { Product };
