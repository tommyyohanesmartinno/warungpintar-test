exports.up = async function(knex) {
    await knex.schema.raw(`
    ALTER TABLE product
    CHANGE COLUMN updated_at updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;`);
};

exports.down = async function(knex) {
    await knex.schema.raw(`
    ALTER TABLE product
    CHANGE COLUMN updated_at updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP;`);
};

