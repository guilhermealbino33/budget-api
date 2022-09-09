import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Budget } from './budget';

@Entity('users')
export class Salesman {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  cpf?: string;

  @Column({ nullable: true })
  cnpj?: string;

  @Column({ nullable: true })
  ie?: string;

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
  phone_number_1: string;

  @Column({ nullable: true })
  phone_number_2: string;

  @Column({ nullable: true })
  birthday: Date;

  @OneToMany(() => Budget, (budget) => budget.salesman)
  budgets: Budget[];

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
  cnpj?: string;
  ie?: string;
  city: string;
  state: string;
  address: string;
  address_number: string;
  cep: string;
  phone_number_1: string;
  phone_number_2: string;
  birthday: Date;
  budgets: Budget[];
  created_at?: Date;
  updated_at?: Date;
}
