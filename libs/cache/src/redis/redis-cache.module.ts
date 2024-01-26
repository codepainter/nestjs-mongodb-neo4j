import { redisStore } from 'cache-manager-redis-yet';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { RedisClientOptions } from 'redis';

import { CacheModule } from '@nestjs/cache-manager';
import {
  CACHE_MANAGER,
  Global,
  Inject,
  Module,
  OnModuleInit,
} from '@nestjs/common';

import { REDIS_CACHE_SERVICE } from '../cache.constants';
import { RedisCacheService } from './redis-cache.service';

@Global()
@Module({
  imports: [
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      socket: {
        host: process.env.REDIS_HOST ?? 'localhost',
        port: parseInt(process.env.REDIS_PORT ?? '6379'),
      },
    }),
  ],
  providers: [
    {
      provide: REDIS_CACHE_SERVICE,
      useClass: RedisCacheService,
    },
  ],
  exports: [REDIS_CACHE_SERVICE],
})
export class RedisCacheModule implements OnModuleInit {
  constructor(
    @InjectPinoLogger() readonly logger: PinoLogger,
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
  ) {}

  public onModuleInit(): any {
    // Commands that are interesting to log
    const commands = ['get', 'set', 'del'];
    const cache = this.cache;
    commands.forEach((commandName) => {
      const oldCommand = cache[commandName];
      cache[commandName] = async (...args) => {
        // Computes the duration
        const start = new Date();
        const result = await oldCommand.call(cache, ...args);
        const end = new Date();
        const duration = end.getTime() - start.getTime();

        // Avoid logging the options
        args = args.slice(0, 2);
        this.logger.debug(
          {
            command: commandName.toUpperCase(),
            args,
            duration: `${duration}ms`,
          },
          'Redis command',
        );

        return result;
      };
    });
  }
}
