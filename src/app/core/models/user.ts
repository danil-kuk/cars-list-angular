import { UserRole } from './user-role';

/**
 * User.
 */
export class User {
  /**
   * User id.
   */
  public id: string;

  /**
   * User name.
   */
  public name: string;

  /**
   * User email.
   */
  public email: string;

  /**
   * User passwaord.
   */
  public password: string;

  /**
   * User role.
   */
  public role: UserRole;

  /**
   * Create new user.
   * @param userData User data.
   */
  constructor(userData: Partial<User>) {
    this.id = userData.id;
    this.name = userData.name;
    this.email = userData.email;
    this.role = userData.role;
    this.password = userData.password;
  }
}
