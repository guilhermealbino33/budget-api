import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { City, ICity } from './city';

@Entity('customers')
export class Customer {
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

  @ManyToOne(() => City)
  @JoinColumn({ name: 'city_code' })
  city: City;

  @Column()
  city_code: string;

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
  name?: string;
  email?: string;
  cpf?: string;
  cnpj?: string;
  ie?: string;
  city_code?: string;
  city?: ICity;
  state?: string;
  address?: string;
  address_number?: string;
  cep?: string;
  phone_number_1?: string;
  phone_number_2?: string;
  birthday?: Date;
  created_at?: Date;
  updated_at?: Date;
}
