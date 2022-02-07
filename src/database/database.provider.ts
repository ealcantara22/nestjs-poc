import knex, { Knex } from 'knex';
import * as config from '../../knexfile';

export const connection = knex(config as Knex.Config);

/**
 * non-class based custom provider: https://docs.nestjs.com/fundamentals/custom-providers#non-class-based-provider-tokens
 */
export const dbProvider = {
  provide: 'KNEX',
  useValue: connection
};
