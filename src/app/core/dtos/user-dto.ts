import { DatabaseItem } from './database-item';

/**
 * User.
 */
export interface UserDto extends DatabaseItem {
  /**
   * User name.
   */
  name: string;

  /**
   * User email.
   */
  email: string;

  /**
   * User password.
   */
  password: string;

  /**
   * User role.
   */
  role: string;
}
