import { Job, DoneCallback } from 'bull';
import { RedisService, redisClient } from '../database/redis.provider';
import { connection as knex } from '../database/database.provider';
import { ProductRepository } from './product.repository';

/**
 * Dependency injection is not available in sandboxed processes.
 * Redis creates a new connection and re-uses it
 * Knex works normally, gets a connection from the pool
 */
export default async function (job: Job, cb: DoneCallback) {
  console.log(`Sandbox ::: [${process.pid}]`);
  const { id } = job.data;
  console.log('id:', id);

  const redis = new RedisService(redisClient);
  console.log('from cache:', await redis.get(id));
  await redis.del(id);
  console.log('product deleted from cache:', await redis.get(id));

  const productRepository = new ProductRepository(knex);
  const product = await productRepository.getProduct(id);
  console.log('from db:', product);
  cb(null, 'It works');
}
