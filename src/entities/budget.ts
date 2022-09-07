import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Product } from './product';
import { Salesman } from './salesman';

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  customer_id: string;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @Column()
  product_id: string;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column()
  salesman_id: string;

  @ManyToOne(() => Salesman)
  @JoinColumn({ name: 'salesman_id' })
  salesman: Salesman;

  @Column()
  quantity: number;

  @Column()
  delivery_type: string;

  @Column()
  delivery_value?: string;

  @Column()
  observations: string;

  @Column()
  additional_items: string;

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
