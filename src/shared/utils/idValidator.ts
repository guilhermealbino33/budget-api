import { validate } from 'uuid';

export function isValidId(id: string): boolean {
  return validate(id);
}
