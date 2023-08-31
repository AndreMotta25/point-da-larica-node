import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { OrderList } from './OrderList';

// usei como enum, pq assim evito uma query no banco.
// acredito que é a melhor opçao pois o objeto não é complexo.
export enum ProductType {
  COMBO = 1,
  FRITAS = 2,
  LANCHES = 3,
  PETISCOS = 4,
}

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

  // Dizer que é um enum aqui não é muito necessario porque já temos um controle
  // sendo feito no useCase; só no useCase já bastaria porque assim ajuda na manutenção
  @Column({
    type: 'enum',
    enum: ProductType,
    default: ProductType.LANCHES,
  })
  type: ProductType;

  constructor() {
    this.id = uuidV4();
  }
}

export { Product };
