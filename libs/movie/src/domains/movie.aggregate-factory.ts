import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import {
  CreateMovieProps,
  MovieAggregate,
  MovieProps,
} from './movie.aggregate';
import { randomUUID } from 'crypto';

@Injectable()
export class MovieAggregateFactory {
  constructor(private publisher: EventPublisher) {}

  create(props: CreateMovieProps, id?: string): MovieAggregate {
    const now = new Date();
    return this.publisher.mergeObjectContext(
      new MovieAggregate({
        id: id || randomUUID(),
        title: props.title,
        createdAt: now,
        updatedAt: now,
      }),
    );
  }

  reconstitute(props: MovieProps): MovieAggregate {
    return this.publisher.mergeObjectContext(
      new MovieAggregate({
        id: props.id,
        title: props.title,
        createdAt: props.createdAt,
        updatedAt: props.updatedAt,
        deletedAt: props.deletedAt,
      }),
    );
  }
}
