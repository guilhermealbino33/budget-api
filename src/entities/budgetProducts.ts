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
import { Product } from './product';

@Entity('budget_products')
export class BudgetProducts {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product_id: string;

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

export interface IBudgetProducts {
  id?: string;
  product_id: string;
  budget_id?: string;
  quantity: number;
  unit_price: number;
  discount: number;
  total_price: number;
  created_at?: Date;
  updated_at?: Date;
}
