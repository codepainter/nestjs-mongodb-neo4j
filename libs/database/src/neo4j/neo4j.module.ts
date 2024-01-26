import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Neo4jModule as NhogsNeo4jModule } from '@nhogs/nestjs-neo4j';

export interface ConfigModuleOptions {
  scheme: string;
  host: string;
  port: string;
  username: string;
  password: string;
}

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
})
export class Neo4jModule {}
