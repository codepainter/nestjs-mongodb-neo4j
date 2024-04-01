import { MovieNode } from '@app/database/neo4j/nodes/movie.node';
import { MOVIE_NEO4J_WRITE_REPOSITORY } from '@app/movie/movie.constants';
import { MovieNeo4jWriteRepository } from '@app/movie/repositories/movie.neo4j-write-repository';
import { Exchange, RoutingKey, Queue } from '@app/queue/rabbitmq';
import { Nack, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Inject, Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { MovieNodeCreatedEvent } from '../../events/movie-node-created/movie-node-created.event';
import { MoviePersistedMessage } from './movie-persisted.message';

@Injectable()
export class MoviePersistedMessageHandler {
  constructor(
    @InjectPinoLogger(MoviePersistedMessageHandler.name)
    readonly logger: PinoLogger,
    @Inject(MOVIE_NEO4J_WRITE_REPOSITORY)
    readonly movieNeo4jWriteRepository: MovieNeo4jWriteRepository,
    readonly eventBus: EventBus,
  ) {}

  @RabbitRPC({
    exchange: Exchange.NEO4J_EXCHANGE,
    routingKey: RoutingKey.NEO4J_MOVIE_PERSISTED,
    queue: Queue.NEO4J_QUEUE,
  })
  public async handleMessage(message: MoviePersistedMessage) {
    this.logger.trace('handleMessage()');
    this.logger.debug({ message }, 'message');

    const movieNode = new MovieNode({
      id: message.props.id,
      title: message.props.title,
      createdAt: message.props.createdAt,
    });
    this.logger.debug({ movieNode }, 'movieNode');

    await this.movieNeo4jWriteRepository.createNode(movieNode);

    this.eventBus.publish(new MovieNodeCreatedEvent(movieNode));

    return new Nack();
  }
}
