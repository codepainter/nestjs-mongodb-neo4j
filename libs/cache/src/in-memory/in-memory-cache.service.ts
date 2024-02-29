import { Cache } from 'cache-manager';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';

import { ICacheService } from '../cache.interface';

@Injectable()
export class InMemoryCacheService implements ICacheService {
  private DEFAULT_TTL_IN_SECONDS = 60;

  constructor(
    @InjectPinoLogger(InMemoryCacheService.name) private logger: PinoLogger,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async get<T>(key: string): Promise<T | undefined> {
    const functionName = this.get.name;
    this.logger.trace({ functionName }, 'BEGIN');
    this.logger.debug({ key }, 'get()');

    const data = await this.cacheManager.get<T>(key);
    this.logger.debug({ data }, 'data');

    const result = data || undefined;
    this.logger.debug({ result }, 'result');

    this.logger.trace({ functionName }, 'END');
    return result;
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    const functionName = this.set.name;
    this.logger.trace({ functionName }, 'BEGIN');
    this.logger.debug({ key, value, ttl }, 'set()');

    await this.cacheManager.set(key, value, ttl);

    this.logger.trace({ functionName }, 'END');
  }

  async del(key: string): Promise<void> {
    const functionName = this.del.name;
    this.logger.trace({ functionName }, 'BEGIN');
    this.logger.debug({ key }, 'del()');

    await this.cacheManager.del(key);

    this.logger.trace({ functionName }, 'END');
  }

  async wrap<T>(
    key: string,
    fn: () => Promise<T>,
    ttl = this.DEFAULT_TTL_IN_SECONDS,
  ): Promise<T> {
    const functionName = this.wrap.name;
    this.logger.trace({ functionName }, 'BEGIN');
    this.logger.debug({ key, ttl }, 'wrap()');

    const result = await this.cacheManager.wrap<T>(key, fn, ttl);
    this.logger.debug({ result }, 'result');

    this.logger.trace({ functionName }, 'END');
    return result;
  }
}
