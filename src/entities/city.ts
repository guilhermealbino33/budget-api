import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { State } from './state';

@Entity('cities')
export class City {
  @PrimaryColumn()
  code: string;

  @Column()
  name: string;

  @ManyToOne(() => State)
  @JoinColumn({ name: 'state_code' })
  state: State;

  @Column()
  state_code: string;
}

export interface IState {
  code: string;
  name: string;
  state_code: string;
}
