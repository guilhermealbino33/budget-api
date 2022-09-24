import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('additional_items')
export class AdditionalItem {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  size?: string;

  @Column({ nullable: true })
  description?: string;

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
  size?: string;
  description?: string;
  created_at?: Date;
  updated_at?: Date;
}
