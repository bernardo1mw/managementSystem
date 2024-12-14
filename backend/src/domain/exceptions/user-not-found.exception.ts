import { AppException } from './base';

export class UserNotFoundException extends AppException {
  constructor(message?: string) {
    super(
      message ?? 'Ops! Parece que este usuário não existe',
      400,
      'UserNotFoundException',
    );
  }
}
