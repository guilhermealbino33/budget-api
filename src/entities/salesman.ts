import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('users')
export class Salesman {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  cpf?: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  address: string;

  @Column()
  address_number: string;

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

export interface ISalesman {
  id?: string;
  name: string;
  email: string;
  cpf?: string;
  city: string;
  state: string;
  address: string;
  address_number: string;
  cep: string;
  birthday: Date;
  created_at?: Date;
  updated_at?: Date;
}
