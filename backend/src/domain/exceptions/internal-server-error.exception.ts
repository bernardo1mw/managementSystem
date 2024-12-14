import { AppException } from './base';

export class InternalServerErrorException extends AppException {
  constructor() {
    super('Internal server error.', 500, 'InternalServerErrorException');
  }
}
