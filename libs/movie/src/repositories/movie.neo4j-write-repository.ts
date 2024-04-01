import { MOVIE_NEO4J_NODE_MODEL_SERVICE } from '@app/database/neo4j';
import { MovieNode } from '@app/database/neo4j/nodes/movie.node';
import { MovieNeo4jNodeModelService } from '@app/database/neo4j/services/movie.neo4j-node.model-service';
import { Inject, Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class MovieNeo4jWriteRepository {
  constructor(
    @InjectPinoLogger(MovieNeo4jWriteRepository.name)
    readonly logger: PinoLogger,
    @Inject(MOVIE_NEO4J_NODE_MODEL_SERVICE)
    readonly movieNodeModelService: MovieNeo4jNodeModelService,
  ) {}

  async createNode(props: MovieNode) {
    this.logger.trace('createNode()');
    this.logger.debug({ props }, 'Props');
    const result = await this.movieNodeModelService
      .create(props, { returns: true })
      .run();
    this.logger.debug({ result }, 'Result');
  }
}
