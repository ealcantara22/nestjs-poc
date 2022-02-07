import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { redisConfig } from './database/redis.provider';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    ProductsModule,
    BullModule.forRoot({
      redis: redisConfig
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
