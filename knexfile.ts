import { Knex } from 'knex';

const config: Knex.Config = {
  client: 'postgresql',
  connection: {
    host: process.env.DB_HOST,
    port: Number(process.env.PORT),
    user: process.env.PG_USER,
    password: process.env.PG_PWD,
    database: process.env.DB_NAME,
    timezone: 'utc', // todo: use easter?
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: `${__dirname}/src/database/migrations`,
  },
};

module.exports = config;
