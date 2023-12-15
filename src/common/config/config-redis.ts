import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-yet';
import { RedisClientOptions } from 'redis';

export const CONFIG_REDIS = () =>
  CacheModule.registerAsync<RedisClientOptions>({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      return {
        store: redisStore,
        socket: {
          host:
            configService.get<string>('NODE_ENV') === 'production'
              ? configService.get<string>('REDIS_DOMAIN')
              : 'localhost',
          port: configService.get<number>('REDIS_PORT'),
        },
        password: configService.get<string>('REDIS_PASSWORD'),
      };
    },
  });
