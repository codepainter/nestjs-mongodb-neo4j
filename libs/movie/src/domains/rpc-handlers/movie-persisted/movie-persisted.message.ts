import { MessageBase } from '@app/shared/rabbit-mq/message.base';
import { MovieProps } from '../../movie.aggregate';

type MoviePersistedMessageProps = Pick<
  MovieProps,
  'id' | 'title' | 'createdAt'
>;

export class MoviePersistedMessage extends MessageBase<MoviePersistedMessageProps> {
  constructor(props: MoviePersistedMessageProps) {
    super(props);
  }
}
