import { MOVIE_NEO4J_NODE_MODEL_SERVICE } from '@app/database/neo4j';
import { MovieNeo4jNodeModelService } from '@app/database/neo4j/services/movie.neo4j-node.model-service';
import { Inject, Injectable } from '@nestjs/common';
import { Neo4jService } from '@nhogs/nestjs-neo4j';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { IMovieNeo4jReadRepository } from '../interfaces/movie.neo4j-read-repository.interface';

@Injectable()
export class MovieNeo4jReadRepository implements IMovieNeo4jReadRepository {
  constructor(
    @InjectPinoLogger(MovieNeo4jReadRepository.name)
    readonly logger: PinoLogger,
    @Inject(MOVIE_NEO4J_NODE_MODEL_SERVICE)
    readonly movieNeo4jNodeModelService: MovieNeo4jNodeModelService,
    private readonly neo4jService: Neo4jService,
  ) {}

  async getAllIds(): Promise<string[]> {
    this.logger.trace('getAllIds()');

    const result = await this.movieNeo4jNodeModelService.findAll().run();
    this.logger.debug({ result }, 'result');

    return result.map((res) => res.id);
  }

  async countAll(): Promise<number> {
    this.logger.trace('countAll()');

    const result = await this.neo4jService.run({
      cypher: 'MATCH (m:Movie) RETURN COUNT(m) as count',
    });
    this.logger.debug({ result }, 'result');

    return result.records[0].toObject().count.low as number;
  }
}
