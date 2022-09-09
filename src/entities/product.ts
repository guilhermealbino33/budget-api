import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Category } from './category';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  name: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column()
  category_id: string;

  @Column()
  sku: string;

  @Column()
  value: number;

  @Column()
  size: string;

  @Column()
  description: string;

  @Column()
  img?: string;

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

export interface IProduct {
  id?: string;
  name: string;
  category_id: string;
  sku: string;
  value: number;
  size: string;
  description?: string;
  img?: string;
  created_at?: Date;
  updated_at?: Date;
}
