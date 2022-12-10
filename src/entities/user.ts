import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Salesman } from './salesman';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  role: string;

  @Column()
  password: string;

  @Column()
  is_admin: boolean;

  @Column()
  is_salesman: boolean;

  @OneToOne(() => Salesman)
  @JoinColumn({ name: 'salesman_id' })
  salesman: Salesman;

  @Column({ nullable: true })
  salesman_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export interface IUser {
  id?: string;
  salesman_id?: string;
  name?: string;
  email?: string;
  role?: string;
  password?: string;
  is_admin?: boolean;
  is_salesman?: boolean;
  created_at?: Date;
  updated_at?: Date;
}
