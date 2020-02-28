exports.up = async function(knex) {
  await knex.schema.createTable("product_price", function(t) {
    t.increments('id');
    t.integer('product_id').notNull();
    t.float('price_regular', 14, 0).notNull();
    t.float('price_special', 14, 0);
    t.dateTime('created_at').defaultTo(knex.fn.now()).notNull();
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTable("product_price");
};
