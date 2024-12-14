import { AppException } from './base';

export class CustomerNotFoundException extends AppException {
  constructor(message?: string) {
    super(
      message ?? 'Ops! Parece que este pedido não existe',
      400,
      'CustomerNotFoundException',
    );
  }
}
