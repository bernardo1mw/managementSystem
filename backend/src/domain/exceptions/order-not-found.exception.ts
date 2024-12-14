import { AppException } from './base';

export class OrderNotFoundException extends AppException {
  constructor(message?: string) {
    super(
      message ?? 'Ops! Parece que este pedido não existe',
      400,
      'OrderNotFoundException',
    );
  }
}
