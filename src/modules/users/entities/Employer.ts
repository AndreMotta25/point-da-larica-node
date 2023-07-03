import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
} from 'typeorm';
import { v4 } from 'uuid';

import { Role } from './Role';

@Entity('Employers')
class Employer {
  @PrimaryColumn()
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @Column({ nullable: false })
  cpf: string;

  @Column({ nullable: false })
  email: string;

  @Column({ default: v4() })
  hashToken: string;

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'users_roles',
    joinColumn: {
      name: 'employer_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  })
  roles: Role[];

  @Column({ default: true })
  situation: boolean;

  constructor() {
    this.id = v4();
    this.situation = true;
  }
}

export { Employer };
