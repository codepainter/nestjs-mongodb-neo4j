import { ExceptionBase } from '@app/shared/exceptions/exception.base';
import { MovieErrorCodes } from '../movie.constants';

export class DuplicateMovieException extends ExceptionBase {
  public readonly code = MovieErrorCodes.DUPLICATE_KEY;
  static readonly message = 'Duplicate Key';

  constructor(metadata?: unknown) {
    super(DuplicateMovieException.message, metadata);
  }
}
