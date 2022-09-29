import {
  Column,
  CreateDateColumn,
  Entity,
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
  code: string;

  @ManyToOne(() => Customer)
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
  code: string;
  customer_id: string;
  products: IBudgetProducts[];
  salesman_id: string;
  delivery_type?: string;
  delivery_value?: number;
  observations?: string;
  additional_items?: IBudgetAdditionalItems[];
  closed?: boolean;
  total_value?: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface IUpdateBudget {
  id?: string;
  code?: string;
  customer_id?: string;
  products?: IBudgetProducts[];
  salesman_id?: string;
  delivery_type?: string;
  delivery_value?: number;
  observations?: string;
  additional_items?: IBudgetAdditionalItems[];
  closed?: boolean;
  total_value?: number;
  created_at?: Date;
  updated_at?: Date;
}
