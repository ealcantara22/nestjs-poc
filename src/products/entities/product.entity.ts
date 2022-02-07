import { Expose } from 'class-transformer';

export class Product {
  @Expose()
  id: number;
  @Expose()
  name: string;
  @Expose()
  active: boolean;
  @Expose()
  description: string;
  @Expose()
  imageUrl: string;
  @Expose()
  createdAt: Date;
  @Expose()
  updatedAt: Date;
}
