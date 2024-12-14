import User from '../../domain/entities/User';

export default interface UserRepository {
  countByEmail(email: string): Promise<number>;
  save(user: User): Promise<void>;
  findOneBy(
    input: Partial<{
      id: number;
      uuid: string;
      providerId: string;
      provider: number;
      email: string;
      document: string;
    }>,
  ): Promise<User | null>;
}
