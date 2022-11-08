import { User } from '../../../entities/user';

export class ProfileMap {
  static toDTO({ id, name, email, role, created_at, updated_at }: User) {
    return {
      id,
      name,
      email,
      role,
      created_at,
      updated_at,
    };
  }
}
