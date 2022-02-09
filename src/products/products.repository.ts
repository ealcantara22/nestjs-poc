import { Knex } from 'knex';
import { Inject, Injectable } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { plainToInstance } from 'class-transformer';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsRepository {
  constructor(@Inject('KNEX') private readonly knex: Knex) {}

  protected readonly PRODUCTS_TABLE: string = 'products';

  async getProducts(): Promise<Product[]> {
    const result = await this.knex(this.PRODUCTS_TABLE).select();
    return plainToInstance(Product, result, { excludeExtraneousValues: true });
  }

  async getProduct(id: number): Promise<Product> {
    const [result] = await this.knex(this.PRODUCTS_TABLE)
      .select()
      .andWhere({ id });

    return result ? plainToInstance(Product, result, { excludeExtraneousValues: true }) : null;
  }

  async create(createProductDto: CreateProductDto): Promise<object> {
    const [id] = await this.knex(this.PRODUCTS_TABLE)
      .insert(createProductDto)
      .returning('id');

    return id;
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<object> {
    const [result] = await this.knex(this.PRODUCTS_TABLE)
      .where({ id })
      .update({ ...updateProductDto, updatedAt: new Date().toISOString() })
      .returning('id');

    return result;
  }

  async delete(id: number): Promise<void> {
    return this.knex(this.PRODUCTS_TABLE)
      .where({ id })
      .delete();
  }
}
