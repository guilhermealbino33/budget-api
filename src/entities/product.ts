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
import { Budget } from './budget';
import { BudgetProducts } from './budgetProducts';
import { Category } from './category';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  name: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category?: Category;

  @Column()
  category_id: string;

  @Column()
  code: string;

  @Column({ nullable: true })
  size?: string;

  @Column({ nullable: true })
  description?: string;

  @OneToMany(() => BudgetProducts, (budgetProducts) => budgetProducts.product, {
    cascade: true,
    eager: true,
  })
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

export interface IProduct {
  id?: string;
  name?: string;
  code?: string;
  category_id?: string;
  category?: Category;
  size?: string;
  description?: string;
  created_at?: Date;
  updated_at?: Date;
}
