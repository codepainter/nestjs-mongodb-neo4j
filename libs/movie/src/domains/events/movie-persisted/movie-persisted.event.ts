import { EventBase } from '@app/shared/cqrs/event.base';
import { MovieProps } from '../../movie.aggregate';

type MoviePersistedEventProps = MovieProps;

export class MoviePersistedEvent extends EventBase<MoviePersistedEventProps> {
  constructor(props: MoviePersistedEventProps) {
    super(props);
  }
}
