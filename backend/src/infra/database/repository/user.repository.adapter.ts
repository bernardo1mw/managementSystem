import UserRepository from 'src/domain/repository/user.repository';
import { DataSource } from 'typeorm';
import { UserEntity } from '../mapping/user.entity';
import User from 'src/domain/entities/User';

export class UserRepositoryTypeORMAdapter implements UserRepository {
  constructor(private readonly connection: DataSource) {}

  async findOneBy(
    input: Partial<{
      id: number;
      uuid: string;
      providerId: string;
      provider: number;
      email: string;
      document: string;
    }>,
  ): Promise<User | null> {
    const repository = this.connection.getRepository(UserEntity);

    const query = repository.createQueryBuilder('users');
    for (const key in input) {
      const i = Object.keys(input).indexOf(key);
      if (Object.prototype.hasOwnProperty.call(input, key)) {
        const value = input[key];
        query
          .andWhere(`users.${key} = :value_${i}`)
          .setParameter(`value_${i}`, value);
      }
    }
    const user = await query.getOne();

    if (!user) return null;
    return User.buildExistingUser({
      id: user.id,
      email: user.email,
      hash: user.password,
      salt: user.salt,
    });
  }

  async countByEmail(email: string): Promise<number> {
    const repository = this.connection.getRepository(UserEntity);
    return repository
      .createQueryBuilder('users')
      .where(`users.email = :email`, { email })
      .getCount();
  }

  async save(user: User): Promise<void> {
    const repository = this.connection.getRepository(UserEntity);
    const userEntity = repository.create({
      id: user.getState().id,
      uuid: user.getState().uuid,
      email: user.getState().email,
      password: user.getState().password,
      salt: user.getState().salt,
    });
    await repository.save(userEntity, { reload: false });
  }
}
