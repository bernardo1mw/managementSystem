import { Command } from 'src/domain/contracts/command.contract';
import Email from 'src/domain/entities/Email';
import User from 'src/domain/entities/User';
import UserRepository from 'src/domain/repository/user.repository';
import { v4 as uuid } from 'uuid';

export class SignupCommand implements Command {
  constructor(
    private readonly userRepository: UserRepository,
    // private readonly stringHashing: StringHashing,
  ) {}

  async execute(input: SignupCommand.Input): Promise<SignupCommand.Output> {
    const { email, password } = input;

    const emailExists = await this.checkMail(email);
    if (emailExists > 0) throw new Error('User Already Exists');

    const user = await User.create({
      uuid: uuid(),
      email: email,
      password: password,
    });

    await this.userRepository.save(user);
  }

  async checkMail(email: string): Promise<number> {
    return email ? this.userRepository.countByEmail(new Email(email).value) : 0;
  }
}

export namespace SignupCommand {
  export type Input = {
    email: string;
    password: string;
  };
  export type Output = void;
}
