import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductRepository } from './product.repository';
import { dbProvider } from '../database/database.provider';
import { redisProvider, RedisService } from '../database/redis.provider';
import { BullModule } from '@nestjs/bull';
import { ProductsQueue } from './products.queue';
import { join } from 'path';

@Module({
  controllers: [ProductsController],
  providers: [
    dbProvider,
    redisProvider,
    ProductsService,
    ProductRepository,
    RedisService,
    ProductsQueue
  ],
  imports: [
    BullModule.registerQueue({
      name: 'productQueue'
    }),
    BullModule.registerQueue({
      name: 'sandBoxQueue',
      processors: [join(__dirname, 'sandbox.queue.processor.js')]
    })
  ]
})
export class ProductsModule {}
