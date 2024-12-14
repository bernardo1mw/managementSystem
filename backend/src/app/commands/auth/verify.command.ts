import { Command } from 'src/domain/contracts/command.contract';
import { TokenManager } from 'src/domain/contracts/token.contract';
import Email from 'src/domain/entities/Email';
import User from 'src/domain/entities/User';
import { InvalidCredentialsException } from 'src/domain/exceptions/invalid-credential.exception';
import { UserNotFoundException } from 'src/domain/exceptions/user-not-found.exception';
import UserRepository from 'src/domain/repository/user.repository';
import { v4 as uuid } from 'uuid';

export class VerifyCommand implements Command {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: Verify.Input): Promise<Verify.Output> {
    const { userId } = input;
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new UserNotFoundException();
    return {
      email: user.getState().email,
    };
  }
}

export namespace Verify {
  export type Input = {
    userId: number;
  };
  export type Output = {
    email: string;
  };
}
