exports.up = async function(knex) {
  await knex.schema.createTable("product", function(t) {
    t.increments('id');
    t.string('title', 1000);
    t.text('description', 'mediumtext');
    t.float('rating', 14, 0).notNull();
    t.text('image', 'mediumtext');
    t.dateTime('created_at').defaultTo(knex.fn.now()).notNull();
    t.dateTime('updated_at').defaultTo(knex.fn.now()).notNull();
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTable("product");
};
