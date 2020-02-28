const knex = require('knex');

const app = {};
const conn = {};

function knexInstance(name) {
    const ctx = conn[name];

    if (ctx && ctx.client && ctx.client.pool && !ctx.client.pool.destroyed) {
        return ctx;
    }

    const client = 'mysql2';
    const connection = process.env[`DATABASE_URL`];
    const pool = { min: 1, max: 2 };
    conn[name] = knex({ client, connection, pool, debug: process.env.APP_ENV !== 'PROD' });
    return conn[name];
}

app.instance = () => {
    const ctx = knexInstance();
    if (!ctx.trans) {
        ctx.trans = () => {
            return new Promise((resolve) => {
                ctx.transaction((trx) => {
                    resolve(trx);
                });
            });
        };
    }

    return ctx;
};

app.dispose = async () => {
    for (let key in conn) {
        await conn[key].destroy();
        console.log('Closed - MysqlContext');
        conn[key] = null;
    }
}

module.exports = app;
