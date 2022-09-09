import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('states')
export class State {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column()
  uf: string;

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
