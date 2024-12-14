import Email from './Email';
import Password from './Password';

export default class User {
  private id: number;
  private email: Email;
  private uuid: string;
  private password: Password;

  private constructor(input: User.Input) {
    Object.assign(this, input);
  }

  static async create(input: User.CreateInput): Promise<User> {
    return new User({
      email: new Email(input.email),
      password: await Password.create(input.password),
      uuid: input.uuid,
    });
  }

  async validatePassword(password: string): Promise<boolean> {
    return this.password.validate(password);
  }

  static async buildExistingUser(input: User.BuildInput) {
    return new User({
      id: input.id,
      email: new Email(input.email),
      password: new Password(input.hash, input.salt),
    });
  }

  getState(): User.Output {
    return {
      id: this.id,
      email: this.email.value,
      uuid: this.uuid,
      password: this.password.value,
      salt: this.password.salt,
    };
  }
}

namespace User {
  export type Input = {
    id?: number;
    email: Email;
    password: Password;
    uuid?: string;
  };
  export type CreateInput = {
    email: string;
    password: string;
    uuid?: string;
  };
  export type BuildInput = {
    id: number;
    email: string;
    hash: string;
    salt: string;
  };

  export type Output = {
    id: number;
    email: string;
    password: string;
    salt: string;
    uuid?: string;
  };
}
