import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('states')
export class State {
  @PrimaryColumn()
  code: string;

  @Column()
  name: string;

  @Column()
  uf: string;
}

export interface IState {
  code: string;
  name: string;
  uf: string;
}
