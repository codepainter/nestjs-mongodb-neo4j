import { ExceptionBase } from '../exceptions/exception.base';
import { VALIDATION_ERROR } from '../exceptions/exception.code';

export class ClassValidatorException extends ExceptionBase {
  public readonly code = VALIDATION_ERROR;
  static readonly message = 'Validation Error';

  constructor(metadata?: unknown) {
    super(ClassValidatorException.message, metadata);
  }
}
