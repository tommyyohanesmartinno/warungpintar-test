exports.up = async function(knex) {
  await knex.schema.createTable("product_image", function(t) {
    t.increments('id');
    t.integer('product_id').notNull();
    t.text('image', 'mediumtext');
    t.dateTime('created_at').defaultTo(knex.fn.now()).notNull();
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTable("product_image");
};
