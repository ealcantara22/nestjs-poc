import { Knex } from 'knex';
import CreateTableBuilder = Knex.CreateTableBuilder;

export async function up(knex: Knex): Promise<void> {
  if ((await knex.schema.hasTable('products')) === false) {
    await knex.schema.createTable('products', (tableBuilder: CreateTableBuilder) => {
      tableBuilder.increments('id');
      tableBuilder.text('name').notNullable();
      tableBuilder.text('description');
      tableBuilder.text('imageUrl');
      tableBuilder.timestamp('createdAt', { useTz: true }).defaultTo(knex.fn.now());
      tableBuilder.timestamp('updatedAt', { useTz: true }).defaultTo(knex.fn.now());
      tableBuilder.boolean('active');
    });
  }

  if ((await knex.schema.hasTable('merchants')) === false) {
    await knex.schema.createTable('merchants', (tableBuilder: CreateTableBuilder) => {
      tableBuilder.increments('id');
      tableBuilder.integer('productId').notNullable().references('id').inTable('products');
      tableBuilder.text('buyUrl').notNullable();
      tableBuilder.timestamp('createdAt', { useTz: true }).defaultTo(knex.fn.now());
      tableBuilder.timestamp('updatedAt', { useTz: true }).defaultTo(knex.fn.now());
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('merchants');
  await knex.schema.dropTableIfExists('products');
}
