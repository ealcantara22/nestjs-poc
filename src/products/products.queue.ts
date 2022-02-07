import { Injectable } from '@nestjs/common';
import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { DoneCallback, Job, Queue } from 'bull';

@Injectable()
@Processor('productQueue')
export class ProductsQueue {
  // nestJs approach with decorators
  @Process('update_v2')
  async update_v2(job: Job<unknown>) {
    console.log(`Product Updated V2:: [${process.pid}] ${JSON.stringify(job.data)}`);
    return {};
  }

  constructor(@InjectQueue('productQueue') private readonly productQueue: Queue) {
    this.config(productQueue);
  }

  // default Jobs configuration
  private readonly DEFAULT_JOB_OPTS: object = {
    // Jobs retry on failed config
    attempts: 5, // number of attempts (retries) on failed jobs
    backoff: {
      type: 'exponential', // time in ms to wait before each attempt
      delay: 5000 // time in ms to wait before each attempt
    },
    // Queues clean up config
    removeOnComplete: 5000, // keeps only the latest x number of completed jobs
    removeOnFail: 5000 // keeps only the latest x number of failed jobs
  };

  // Producers
  update(data: object) {
    this.productQueue.add('update', data, this.DEFAULT_JOB_OPTS);
  }

  delete(data: object) {
    this.productQueue.add('delete', data, this.DEFAULT_JOB_OPTS);
  }

  // consumers
  productUpdated(job: Job, cb: DoneCallback) {
    console.log(`Product Updated:: [${process.pid}] ${JSON.stringify(job.data)}`);
    cb(null, 'It works');
  }

  productDeleted(job: Job, cb: DoneCallback) {
    console.log(`Product Deleted:: [${process.pid}] ${JSON.stringify(job.data)}`);
    cb(null, 'It works');
  }

  // Queue config
  private config(queue: Queue) {
    // registering subscribers
    queue.process('update', 1, this.productUpdated);
    queue.process('delete', 0, this.productDeleted);

    // event listeners
    queue.on('failed', (job, error) => {
      console.error(`Error in job ${job.name} with id ${job.id} failed: ${error}`, error);
    });
  }
}
