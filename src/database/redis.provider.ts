import IORedis, { Redis } from 'ioredis';
import { Inject, Injectable } from '@nestjs/common';

const REDIS_TTL = 60 * 60 * 24;

export const redisConfig = {
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  db: Number(process.env.REDIS_DB)
};

export const redisClient = new IORedis(redisConfig);

// TODO: ioredis auto-reconnect:: https://github.com/luin/ioredis#auto-reconnect

redisClient.on('ready', () => {
  console.log('Redis connection established:', new Date().toISOString());
});

redisClient.on('closed', (event) => {
  console.log('Redis connection closed:', event);
});

/**
 * redis provider settings
 */
export const redisProvider = {
  provide: 'REDIS',
  useValue: redisClient
};

/**
 * Actual service 😬
 */
@Injectable()
export class RedisService {
  constructor(@Inject('REDIS') private readonly redis: Redis) {}

  set(key: string, value: any) {
    return this.redis.set(key, JSON.stringify(value), 'ex', REDIS_TTL);
  }

  get(key: string) {
    return this.redis.get(key);
  }

  del(key: string) {
    return this.redis.del(key);
  }
}
