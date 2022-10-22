import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { City, ICity } from './city';
import { IState, State } from './state';

@Entity('salesman')
export class Salesman {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  account_type: string;

  @Column({ nullable: true })
  cpf?: string;

  @Column({ nullable: true })
  cnpj?: string;

  @Column({ nullable: true })
  ie?: string;

  @ManyToOne(() => City, {
    cascade: true,
    eager: true,
  })
  city: City;

  @ManyToOne(() => State, {
    cascade: true,
    eager: true,
  })
  state: State;

  @Column()
  district: string;

  @Column()
  address: string;

  @Column({ nullable: true })
  complement: string;

  @Column()
  address_number: string;

  @Column()
  cep: string;

  @Column()
  phone_number_1: string;

  @Column({ nullable: true })
  phone_number_2: string;

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

export interface ISalesman {
  id?: string;
  name?: string;
  email?: string;
  account_type?: string;
  cpf?: string;
  cnpj?: string;
  ie?: string;
  city_code?: string;
  city?: ICity;
  district?: string;
  complement?: string;
  state_code?: string;
  state?: IState;
  address?: string;
  address_number?: string;
  cep?: string;
  phone_number_1?: string;
  phone_number_2?: string;
  created_at?: Date;
  updated_at?: Date;
}
