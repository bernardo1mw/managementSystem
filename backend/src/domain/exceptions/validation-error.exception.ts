import { AppException } from './base';

export class ValidationErrorException extends AppException {
  constructor() {
    super('Validation Error.', 400, 'ValidationErrorException');
  }
}
