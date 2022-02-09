import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsRepository } from './products.repository';
import { Product } from './entities/product.entity';
import { RedisService } from '../database/redis.provider';
import { ProductsQueue } from './products.queue';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { plainToInstance } from 'class-transformer';
import { SearchService } from '../search/search.service';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productRepository: ProductsRepository,
    private readonly redis: RedisService,
    private readonly productQueue: ProductsQueue,
    @InjectQueue('sandBoxQueue') private readonly sandbox: Queue,
    @InjectQueue('productQueue') private readonly productQueueV2: Queue,
    private readonly searchService: SearchService
  ) {}

  async create(createProductDto: CreateProductDto): Promise<object> {
    return await this.productRepository.create(createProductDto);
  }

  findAll(): Promise<Product[]> {
    return this.productRepository.getProducts();
  }

  async findOne(id: number): Promise<Product> {
    const cached = await this.redis.get(id.toString());
    if (cached) return plainToInstance(Product, JSON.parse(cached));

    const product = await this.productRepository.getProduct(id);
    await this.redis.set(id.toString(), product);

    return product;
  }

  /**
   * deletes a product from db and clears the redis cache in a background process
   */
  async remove(id: number) {
    const result = await this.productRepository.delete(id);
    await this.sandbox.add(result);
    return result;
  }

  /**
   * updates a product in db and clears clears the redis cache in a background process,
   * also trying out 3 different ways of using bull with nest
   */
  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);
    if (!product) throw new NotFoundException();

    const updatedProduct = await this.productRepository.update(id, updateProductDto);
    await this.redis.del(id.toString()); // delete product from cache
    this.searchService.update('local_products', id, updatedProduct); // update product in elasticsearch

    console.log(`Parent process Id: ${process.pid}`);
    await this.productQueue.update(updatedProduct); // worker config init consumers
    await this.productQueueV2.add('update_v2', updatedProduct); // consumer with decorators
    await this.sandbox.add(updatedProduct); // independent consumer processor [child process]

    return updatedProduct;
  }
}
