import { Column, PrimaryColumn, Entity, CreateDateColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('Coupons')
class Coupon {
  @PrimaryColumn()
  id: string;

  @Column('varchar', { length: 5 })
  code: string;

  @Column('decimal', { precision: 18, scale: 2 })
  value: number;

  @Column()
  amount: number;

  @Column()
  expire_at: Date;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;

  @Column({ default: true })
  valid: boolean;

  @Column('decimal', { precision: 18, scale: 2, default: 10.0 })
  minimumValue: number;

  constructor() {
    this.id = uuidv4();
    this.valid = true;
  }
}
export default Coupon;
