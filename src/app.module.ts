import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { redisConfig } from './database/redis.provider';
import { BullModule } from '@nestjs/bull';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    ProductsModule,
    BullModule.forRoot({
      redis: redisConfig
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      // include: [ProductsModule],
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      // autoSchemaFile: true,
      // autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
      debug: true,
      playground: true
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
