import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  name: string;

  @Column()
  category: string;

  @Column()
  sku: string;

  @Column()
  value: number;

  @Column()
  size: string;

  @Column()
  description: string;

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
  category: string;
  sku: string;
  value: number;
  size: string;
  description?: string;
  created_at?: Date;
  updated_at?: Date;
}
