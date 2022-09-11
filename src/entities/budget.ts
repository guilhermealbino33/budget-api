import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
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

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @Column()
  customer_id: string;

  @ManyToMany(() => Product)
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

  @ManyToOne(() => Salesman)
  @JoinColumn({ name: 'salesman_id' })
  salesman: Salesman;

  @Column()
  salesman_id: string;

  @Column()
  quantity: number;

  @Column()
  delivery_type: string;

  @Column({ nullable: true })
  delivery_value?: string;

  @Column({ nullable: true })
  observations: string;

  @ManyToMany(() => AdditionalItem)
  @JoinTable({
    name: 'budget_additional_item',
    joinColumn: {
      name: 'additional_item_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'budget_id',
      referencedColumnName: 'id',
    },
  })
  additional_items?: AdditionalItem[];

  @Column()
  total_value: number;

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
  products: Product[];
  salesman_id: string;
  quantity: number;
  delivery_type: string;
  delivery_value?: string;
  observations?: string;
  additional_items?: AdditionalItem[];
  total_value: number;
  created_at?: Date;
  updated_at?: Date;
}
