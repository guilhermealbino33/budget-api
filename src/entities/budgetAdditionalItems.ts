import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Budget } from './budget';
import { AdditionalItem } from './additionalItem';

@Entity('budget_additional_item')
export class BudgetAdditionalItems {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ManyToOne(() => AdditionalItem)
  @JoinColumn({ name: 'additional_item_id' })
  additional_item_id: string;

  @ManyToOne(() => Budget)
  @JoinColumn({ name: 'budget_id' })
  budget_id?: string;

  @Column()
  quantity: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  unit_price: number;

  @Column({ type: 'numeric', precision: 10, scale: 2, default: 0 })
  discount: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  total_price: number;

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

export interface IBudgetAdditionalItems {
  id?: string;
  additional_item_id: string;
  budget_id?: string;
  quantity: number;
  unit_price: number;
  discount: number;
  total_price: number;
  created_at?: Date;
  updated_at?: Date;
}
