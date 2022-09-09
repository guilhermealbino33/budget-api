import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { State } from './state';

@Entity('cities')
export class City {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column()
  uf: string;

  @ManyToMany(() => State)
  @JoinColumn({ name: 'uf' })
  user: State;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export interface IState {
  id?: string;
  code: string;
  name: string;
  uf: string;
}
