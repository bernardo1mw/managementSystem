import { pbkdf2, randomBytes } from 'crypto';

export default class Password {
  constructor(
    readonly value: string,
    readonly salt: string,
  ) {
    if (!this.isValid(value)) {
      throw new Error('Invalid password');
    }
  }

  static create(password: string, salt?: string): Promise<Password> {
    const generatedSalt = salt || randomBytes(20).toString('hex');
    return new Promise((resolve) => {
      pbkdf2(password, generatedSalt, 100, 64, 'sha512', (error, value) => {
        resolve(new Password(value.toString('hex'), generatedSalt));
      });
    });
  }
  private isValid(password: string) {
    if (password && password.length > 5) {
      return true;
    }
    return false;
  }
  async validate(password: string): Promise<boolean> {
    return new Promise((resolve) => {
      pbkdf2(password, this.salt, 100, 64, 'sha512', (error, value) => {
        resolve(this.value === value.toString('hex'));
      });
    });
  }
}
