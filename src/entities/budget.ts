import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import {
  BudgetAdditionalItems,
  IBudgetAdditionalItems,
} from './budgetAdditionalItems';
import { BudgetProducts, IBudgetProducts } from './budgetProducts';
import { Customer } from './customer';
import { Salesman } from './salesman';

@Entity('budgets')
export class Budget {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  @Generated('increment')
  code: number;

  @Column({ default: 'new' })
  status: string;

  @ManyToOne(() => Customer, { eager: true })
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @Column()
  customer_id: string;

  @OneToMany(() => BudgetProducts, (budgetProducts) => budgetProducts.budget, {
    cascade: true,
    eager: true,
  })
  products: IBudgetProducts[];

  @ManyToOne(() => Salesman)
  @JoinColumn({ name: 'salesman_id' })
  salesman: Salesman;

  @Column()
  salesman_id: string;

  @Column()
  delivery_type?: string;

  @Column({
    nullable: true,
    type: 'numeric',
    precision: 10,
    scale: 2,
    default: 0,
  })
  delivery_value?: number;

  @Column({ nullable: true })
  delivery_date?: string;

  @Column({ nullable: true })
  observations: string;

  @OneToMany(
    () => BudgetAdditionalItems,
    (budgetAdditionalItems) => budgetAdditionalItems.budget,
    {
      cascade: true,
      eager: true,
      nullable: true,
    }
  )
  additional_items?: IBudgetAdditionalItems[];

  @Column({ default: false, nullable: false })
  closed: boolean;

  @Column({ type: 'numeric', precision: 10, scale: 2, default: 0 })
  total_value: number;

  @Column({ nullable: true })
  payment_conditions?: string;

  @Column({ nullable: true })
  proposal_validity?: string;

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

export interface IBudget {
  id?: string;
  code: number;
  status?: string;
  customer_id: string;
  products: IBudgetProducts[];
  salesman_id: string;
  delivery_type?: string;
  delivery_value?: number;
  delivery_date?: string;
  observations?: string;
  additional_items?: IBudgetAdditionalItems[];
  closed?: boolean;
  total_value?: number;
  payment_conditions?: string;
  proposal_validity?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface IUpdateBudget {
  id?: string;
  code?: number;
  customer_id?: string;
  products?: IBudgetProducts[];
  salesman_id?: string;
  delivery_type?: string;
  delivery_value?: number;
  delivery_date?: string;
  observations?: string;
  additional_items?: IBudgetAdditionalItems[];
  closed?: boolean;
  total_value?: number;
  created_at?: Date;
  updated_at?: Date;
}
