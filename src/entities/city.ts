import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { State } from './state';

@Entity('cities')
export class City {
  @PrimaryColumn()
  code: string;

  @Column()
  name: string;

  @ManyToOne(() => State, (state) => state.cities)
  @JoinColumn({ name: 'state_code' })
  state: State;

  @Column()
  state_code: string;
}

export interface ICity {
  code: string;
  name: string;
  state: State;
  state_code: string;
}
