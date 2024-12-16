import { AppException } from './base';

export class CustomerAlreadyExistsException extends AppException {
  constructor(message?: string) {
    super(
      message ?? 'Já existe um cliente com esse CNPJ',
      400,
      'CustomerAlreadyExistsException',
    );
  }
}
