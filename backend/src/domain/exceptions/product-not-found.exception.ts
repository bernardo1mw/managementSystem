import { AppException } from './base';

export class ProductNotFoundException extends AppException {
  constructor(message?: string) {
    super(
      message ?? 'Ops! Parece que este produto não existe',
      400,
      'ProductNotFoundException',
    );
  }
}
