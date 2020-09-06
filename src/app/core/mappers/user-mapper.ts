import { UserDto } from '../dtos';
import { User } from '../models';

import { Mapper } from './mapper';

/**
 * Mapper for UserDto and User.
 */
export class UserMapper implements Mapper<UserDto, User> {
  /** @inheritdoc */
  public fromDto(dto: UserDto): User {
    const user = new User({
      id: dto.id,
      name: dto.name,
      email: dto.email,
      role: Number(dto.role),
      password: dto.password,
    });
    return user;
  }

  /** @inheritdoc */
  public toDto(domain: User): UserDto {
    const dto: UserDto = {
      id: domain?.id ?? '',
      name: domain?.name,
      email: domain?.email,
      role: domain?.role.toString(),
      password: domain?.password,
    };
    return dto;
  }
}
