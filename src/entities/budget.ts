import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { AdditionalItem } from './additionalItem';
import { Customer } from './customer';
import { Product } from './product';
import { Salesman } from './salesman';

@Entity('budgets')
export class Budget {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  code: string;

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
  additional_items_id: string;

  @ManyToOne(() => AdditionalItem)
  @JoinColumn({ name: 'additional_items_id' })
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

export interface IBudget {
  id?: string;
  code: string;
  customer_id: string;
  product_id: string;
  salesman_id: string;
  quantity: number;
  delivery_type: string;
  delivery_value?: string;
  observations: string;
  additional_items: string;
  created_at?: Date;
  updated_at?: Date;
}
