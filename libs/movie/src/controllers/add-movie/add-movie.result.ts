import { MovieCodes } from '@app/movie/movie.constants';
import { IdResult } from '@app/shared/results/id.result';

export class AddMovieResult extends IdResult {
  code = MovieCodes.ADDED;
  message = 'Movie added successfully';

  constructor(public readonly id: string) {
    super({ id });
  }
}
