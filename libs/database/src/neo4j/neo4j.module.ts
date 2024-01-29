import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Neo4jModule as NhogsNeo4jModule } from '@nhogs/nestjs-neo4j';

import { NEO4J_UNIT_OF_WORK_FACTORY } from './neo4j.constants';
import { Neo4jUnitOfWorkFactory } from './unit-of-work/neo4j.unit-of-work.factory';

export interface ConfigModuleOptions {
  scheme: string;
  host: string;
  port: string;
  username: string;
  password: string;
}

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
  ],
  exports: [NEO4J_UNIT_OF_WORK_FACTORY],
})
export class Neo4jModule {}
