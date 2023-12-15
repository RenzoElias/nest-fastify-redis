import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { CONFIG_REDIS } from 'src/common/config/config-redis';

@Module({
  exports: [CacheModule],
  imports: [CONFIG_REDIS()],
})
export class CommonModule {}
