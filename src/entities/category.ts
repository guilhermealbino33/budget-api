import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { Product } from './product';

@Entity('categories')
class Category {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Product, (product) => product.category)
  products?: Product[];
  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export interface ICategory {
  id?: string;
  name: string;
  description: string;
  created_at?: Date;
  updated_at?: Date;
}

export { Category };
