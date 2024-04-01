import { EventBase } from '@app/shared/cqrs/event.base';
import { MovieProps } from '../../movie.aggregate';

type MovieCreatedEventProps = MovieProps;

export class MovieCreatedEvent extends EventBase<MovieCreatedEventProps> {
  constructor(props: MovieCreatedEventProps) {
    super(props);
  }
}
