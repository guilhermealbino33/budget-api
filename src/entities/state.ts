import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { City } from './city';

@Entity('states')
export class State {
  @PrimaryColumn()
  code: string;

  @Column()
  name: string;

  @Column()
  uf: string;

  @OneToMany(() => City, (city) => city.state, {
    cascade: true,
    eager: true,
  })
  cities: City[];
}

export interface IState {
  code: string;
  name: string;
  uf: string;
}
