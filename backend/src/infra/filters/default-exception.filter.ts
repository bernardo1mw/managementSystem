import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  Logger,
} from '@nestjs/common';
import { AppException } from 'src/domain/exceptions/base';
import { InternalServerErrorException } from 'src/domain/exceptions/internal-server-error.exception';
import { ValidationErrorException } from 'src/domain/exceptions/validation-error.exception';

@Catch()
export class DefaultExceptionsFilter implements ExceptionFilter {
  private loggerService: Logger;

  constructor() {
    this.loggerService = new Logger();
  }

  catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    if (exception instanceof BadRequestException) {
      const validationException = new ValidationErrorException();
      const { statusCode, statusText } = validationException;
      const errors = exception.getResponse() as { message: string };
      return response.status(statusCode).send({
        statusText,
        errors: errors.message,
        details: [],
      });
    }

    if (exception instanceof AppException) {
      const { statusText, statusCode, customMessage, details } = exception;
      if (statusCode === 500) this.logError(exception);
      return response.status(statusCode).send({
        statusText,
        errors:
          typeof customMessage === 'string' ? [customMessage] : customMessage,
        details: typeof details === 'string' ? [details] : details,
      });
    }

    const { statusCode, statusText, customMessage } =
      new InternalServerErrorException();

    const errors = exception?.message || customMessage;
    return response.status(exception?.status || statusCode).send({
      statusText: exception?.name || statusText,
      errors,
    });
  }

  logError(exception: any) {
    this.loggerService.error(exception);
  }
}
