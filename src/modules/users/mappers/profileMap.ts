import { User } from '../../../entities/user';

export class ProfileMap {
  static toDTO({
    id,
    name,
    email,
    role,
    salesman_id,
    created_at,
    updated_at,
  }: User) {
    return {
      id,
      salesman_id,
      name,
      email,
      role,
      created_at,
      updated_at,
    };
  }
}
