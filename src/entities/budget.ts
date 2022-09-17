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
import { AdditionalItem } from './additionalItem';
import { IBudgetProducts } from './budgetProducts';
import { Customer } from './customer';
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

  products: IBudgetProducts[];

  @ManyToOne(() => Salesman)
  @JoinColumn({ name: 'salesman_id' })
  salesman: Salesman;

  @Column()
  salesman_id: string;

  @Column()
  delivery_type: string;

  @Column({ nullable: true })
  delivery_value?: number;

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

  @Column({ default: false, nullable: false })
  closed: boolean;

  @Column()
  total_value: number;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}

export interface IBudget {
  id?: string;
  code: string;
  customer_id: string;
  products?: IBudgetProducts[];
  salesman_id: string;
  delivery_type: string;
  delivery_value?: number;
  observations?: string;
  additional_items?: AdditionalItem[];
  closed: boolean;
  total_value?: number;
  created_at?: Date;
  updated_at?: Date;
}
