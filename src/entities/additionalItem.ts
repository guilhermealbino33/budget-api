import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Budget } from './budget';
import { BudgetAdditionalItems } from './budgetAdditionalItems';

@Entity('additional_items')
export class AdditionalItem {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  list_price: number;

  @Column({ nullable: true })
  description?: string;

  @OneToMany(
    () => BudgetAdditionalItems,
    (budgetAdditionalItems) => budgetAdditionalItems.additional_item,
    {
      cascade: true,
      eager: true,
    }
  )
  budgets: Budget[];

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

export interface IAdditionalItem {
  id?: string;
  code: string;
  name: string;
  list_price?: number;
  description?: string;
  created_at?: Date;
  updated_at?: Date;
}
