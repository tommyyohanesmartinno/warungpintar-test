exports.up = async function(knex) {
  await knex.schema.createTable("product", function(t) {
    t.increments('id');
    t.string('name', 1000);
    t.string('url', 1000);
    t.text('description', 'mediumtext');
    t.float('price_regular', 14, 0).notNull();
    t.float('price_special', 14, 0);
    t.dateTime('created_at').defaultTo(knex.fn.now()).notNull();
    t.dateTime('updated_at').defaultTo(knex.fn.now()).notNull();
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTable("product");
};
