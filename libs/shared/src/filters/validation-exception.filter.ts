import { ExpressResponse } from '@app/logger/interfaces/logger.interface';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

import { ClassValidatorException } from '../class-validator/class-validator.exception';
import { ErrorResult } from '../results/error-result.base';

@Catch(ClassValidatorException)
export class ValidationExceptionFilter implements ExceptionFilter {
  public catch(exception: ClassValidatorException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse() as ExpressResponse;

    response.status(400).send(
      new ErrorResult({
        code: exception.code,
        message: exception.message,
        metadata: exception.metadata as object,
      }),
    );
  }
}
