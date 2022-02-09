import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { dbProvider } from '../database/database.provider';
import { redisProvider, RedisService } from '../database/redis.provider';
import { BullModule } from '@nestjs/bull';
import { ProductsQueue } from './products.queue';
import { join } from 'path';
import { SearchService } from '../search/search.service';
import { SearchModule } from '../search/search.module';

@Module({
  controllers: [ProductsController],
  providers: [
    dbProvider,
    redisProvider,
    ProductsService,
    ProductsRepository,
    RedisService,
    ProductsQueue,
    SearchService
  ],
  imports: [
    BullModule.registerQueue({
      name: 'productQueue'
    }),
    BullModule.registerQueue({
      name: 'sandBoxQueue',
      processors: [join(__dirname, 'sandbox.queue.processor.js')]
    }),
    SearchModule
  ]
})
export class ProductsModule {}
