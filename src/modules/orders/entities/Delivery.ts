import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { v4 } from 'uuid';

import { Order } from './Order';

@Entity('Deliverys')
class Delivery {
  @PrimaryColumn()
  id: string;

  // isso aqui serve para não carregar a order toda e sim somente o seu id
  @Column({ nullable: false })
  orderId: string;

  @OneToOne(() => Order, { nullable: false })
  @JoinColumn()
  order: Order;

  @Column({ nullable: false })
  adress: string;

  // retirar depois
  @Column({ default: 'A enviar' })
  status: string;

  @Column({ default: false })
  send: boolean;

  constructor() {
    this.id = v4();
  }
}

export { Delivery };
