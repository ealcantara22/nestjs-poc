import { Expose } from 'class-transformer';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Product {
  @Field(() => Int)
  @Expose()
  id: number;

  @Field({ nullable: false })
  @Expose()
  name: string;

  @Field({ nullable: false })
  @Expose()
  active: boolean;

  @Field({ nullable: true })
  @Expose()
  description: string;

  @Field({ nullable: false })
  @Expose()
  imageUrl: string;

  @Field({ nullable: false })
  @Expose()
  createdAt: Date;

  @Field({ nullable: false })
  @Expose()
  updatedAt: Date;
}
