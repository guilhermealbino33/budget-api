import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
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

  @ManyToOne(() => Customer, (customer) => customer.budgets)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @ManyToMany(() => Product, (product) => product.budgets)
  @JoinTable({
    name: 'budget_product',
    joinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'budget_id',
      referencedColumnName: 'id',
    },
  })
  products: Product[];

  @ManyToOne(() => Salesman, (salesman) => salesman.budgets)
  @JoinColumn({ name: 'salesman_id' })
  salesman: Salesman;

  @Column()
  quantity: number;

  @Column()
  delivery_type: string;

  @Column({ nullable: true })
  delivery_value?: string;

  @Column({ nullable: true })
  observations: string;

  @OneToMany(() => AdditionalItem, (additional_item) => additional_item.budget)
  additional_items?: AdditionalItem[];

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
  customer: Customer;
  products: Product[];
  salesman: Salesman;
  quantity: number;
  delivery_type: string;
  delivery_value?: string;
  observations: string;
  additional_items?: AdditionalItem[];
  created_at?: Date;
  updated_at?: Date;
}
