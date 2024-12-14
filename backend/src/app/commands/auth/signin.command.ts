import { Command } from 'src/domain/contracts/command.contract';
import { TokenManager } from 'src/domain/contracts/token.contract';
import Email from 'src/domain/entities/Email';
import User from 'src/domain/entities/User';
import { InvalidCredentialsException } from 'src/domain/exceptions/invalid-credential.exception';
import { UserNotFoundException } from 'src/domain/exceptions/user-not-found.exception';
import UserRepository from 'src/domain/repository/user.repository';
import { v4 as uuid } from 'uuid';

export class SigninCommand implements Command {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenManager: TokenManager,
  ) {}

  async execute(input: Signin.Input): Promise<Signin.Output> {
    const { email, password } = input;
    const user = await this.userRepository.findOneBy({ email });
    if (!user) throw new UserNotFoundException();
    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) throw new InvalidCredentialsException();
    const token = await this.tokenManager.generateToken({
      uid: user.getState().id,
      id: user.getState().uuid,
    });
    return { token };
  }
}

export namespace Signin {
  export type Input = {
    email: string;
    password: string;
  };
  export type Output = {
    token: string;
  };
}
