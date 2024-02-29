import { CacheModule } from '@nestjs/cache-manager';
import { Global, Module } from '@nestjs/common';

import { IN_MEMORY_CACHE_SERVICE } from '../cache.constants';
import { InMemoryCacheService } from './in-memory-cache.service';

@Global()
@Module({
  imports: [CacheModule.register()],
  providers: [
    {
      provide: IN_MEMORY_CACHE_SERVICE,
      useClass: InMemoryCacheService,
    },
  ],
  exports: [IN_MEMORY_CACHE_SERVICE],
})
export class InMemoryCacheModule {}
