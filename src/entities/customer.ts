import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  name: string;

  @Column()
  cpf: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  address: string;

  @Column()
  number: string;

  @Column()
  cep: string;

  @Column()
  birthday: Date;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export interface ICustomer {
  id?: string;
  name: string;
  cpf: string;
  city: string;
  state: string;
  address: string;
  number: string;
  cep: string;
  birthday: Date;
  created_at?: Date;
  updated_at?: Date;
}
