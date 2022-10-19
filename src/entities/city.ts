import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('cities')
export class City {
  @PrimaryColumn()
  code: string;

  @Column()
  name: string;

  @Column()
  state_code: string;
}

export interface ICity {
  code: string;
  name: string;
  state_code: string;
}
