import { AppException } from './base';

export class InvalidCredentialsException extends AppException {
  constructor(message?: string) {
    super(
      message ?? 'Usuário/senha incorreto(s)',
      400,
      'AuthenticationFailureException',
    );
  }
}
