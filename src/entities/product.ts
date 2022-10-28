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
import { ProductImage } from './productImage';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  name: string;

  @ManyToOne(() => Category, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({ name: 'category_id' })
  category?: Category;

  @Column()
  category_id: string;

  @Column()
  code: string;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
  installation_area: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  list_price: number;

  @Column({ nullable: true })
  description?: string;

  @OneToMany(() => BudgetProducts, (budgetProducts) => budgetProducts.product, {
    cascade: true,
    eager: true,
  })
  budgets: Budget[];

  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: true,
    eager: true,
    nullable: true,
  })
  images: ProductImage[];

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
  installation_area?: number;
  list_price?: number;
  category_id?: string;
  category?: Category;
  description?: string;
  created_at?: Date;
  updated_at?: Date;
}
