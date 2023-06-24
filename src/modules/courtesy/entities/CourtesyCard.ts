import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { v4 } from 'uuid';

import { Employer } from '@modules/users/entities/Employer';

@Entity('CourtesyCards')
class CourtesyCard {
  @PrimaryColumn()
  id: string;

  @Column('decimal', { precision: 18, scale: 2 })
  value: number;

  @ManyToOne(() => Employer)
  employer: Employer;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;

  @Column({ type: 'timestamp without time zone' })
  expiresIn: Date;

  @Column('varchar', { length: 5 })
  code: string;

  @Column({ nullable: false })
  cpf: string;

  @Column({ default: false })
  used: boolean;

  @Column('text')
  motivation: string;

  constructor() {
    this.used = false;
    this.id = v4();
  }
}

export { CourtesyCard };
