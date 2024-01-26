import { Cache } from 'cache-manager';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';

import { ICacheService } from '../cache.interface';

@Injectable()
export class RedisCacheService implements ICacheService {
  private DEFAULT_TTL_IN_SECONDS = 60;

  constructor(
    @InjectPinoLogger(RedisCacheService.name) private logger: PinoLogger,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async get<T>(key: string): Promise<T> {
    this.logger.debug({ key }, 'get()');

    const data = await this.cacheManager.get<T>(key);
    this.logger.debug({ data }, 'data');

    const result = data || undefined;
    this.logger.debug({ result }, 'result');

    return result;
  }

  async set<T>(
    key: string,
    value: T,
    ttlInSeconds = this.DEFAULT_TTL_IN_SECONDS,
  ): Promise<void> {
    this.logger.debug({ key, value, ttlInSeconds }, 'set()');
    await this.cacheManager.set(key, value, ttlInSeconds);
  }

  async del(key: string): Promise<void> {
    this.logger.debug({ key }, 'del()');
    await this.cacheManager.del(key);
  }

  async wrap<T>(
    key: string,
    fn: () => Promise<T>,
    ttlInSeconds = this.DEFAULT_TTL_IN_SECONDS,
  ): Promise<T> {
    this.logger.debug({ key, ttlInSeconds }, 'wrap()');

    const result = await this.cacheManager.wrap<T>(key, fn, ttlInSeconds);
    this.logger.debug({ result }, 'result');

    return result;
  }
}
