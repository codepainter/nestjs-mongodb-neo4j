import { Global, Module, Provider } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Neo4jModule as NhogsNeo4jModule } from '@nhogs/nestjs-neo4j';

import {
  FOLLOW_NEO4J_RELATIONSHIP_MODEL_SERVICE,
  NEO4J_UNIT_OF_WORK_FACTORY,
  USER_NEO4J_NODE_MODEL_SERVICE,
} from './neo4j.constants';
import { FollowNeo4jRelationshipModelService } from './services/follow.neo4j-relationship.model-service';
import { UserNeo4jNodeModelService } from './services/user.neo4j-node.model-service';
import { Neo4jUnitOfWorkFactory } from './unit-of-work/neo4j.unit-of-work.factory';

export interface ConfigModuleOptions {
  scheme: string;
  host: string;
  port: string;
  username: string;
  password: string;
}

const Services: Provider[] = [
  {
    provide: USER_NEO4J_NODE_MODEL_SERVICE,
    useClass: UserNeo4jNodeModelService,
  },
  {
    provide: FOLLOW_NEO4J_RELATIONSHIP_MODEL_SERVICE,
    useClass: FollowNeo4jRelationshipModelService,
  },
];

@Global()
@Module({
  imports: [
    NhogsNeo4jModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        scheme: 'bolt',
        host: config.get('NEO4J_HOST'),
        port: config.get('NEO4J_PORT'),
        username: config.get('NEO4J_USER'),
        password: config.get('NEO4J_PASSWORD'),
        database: 'neo4j',
      }),
      global: true,
    }),
  ],
  providers: [
    {
      provide: NEO4J_UNIT_OF_WORK_FACTORY,
      useClass: Neo4jUnitOfWorkFactory,
    },
    ...Services,
  ],
  exports: [NEO4J_UNIT_OF_WORK_FACTORY, ...Services],
})
export class Neo4jModule {}
