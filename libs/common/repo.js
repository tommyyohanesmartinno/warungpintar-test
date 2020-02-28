const db = require('./db');

class Repo {
    constructor(option = {}) {
        const { trans } = option;
        this.ctx = trans || db.instance();
        this.tableName = option.name;
        this.primaryKey = option.key;
        this.guid = option.guid;
    }

    findOne(where) {
        if (where) {
            return this.ctx(this.tableName).where(where).first();
        }
        return this.ctx(this.tableName).first();
    }

    findAll(where) {
        if (where) {
            return this.ctx(this.tableName).where(where).select();
        }
        return this.ctx(this.tableName).select();
    }

    async list(query) {
        const meta = { limit: 10, skip: 0, sortDir: 'asc' };
        const fields = [];
        const keys = ['page', 'limit', 'sortBy', 'sortDir', 'fields'];
        Object.keys(query).forEach(key => {
            if (keys.indexOf(key) < 0) {
                fields.push(key);
            }
        });

        const {
            limit, page, sortDir, sortBy
        } = query;
        if (limit) meta.limit = parseInt(limit, 0);
        if (page) meta.skip = (parseInt(page, 10) - 1) * meta.limit;
        if (sortBy) meta.sortBy = sortBy;
        if (sortDir) meta.sortDir = sortDir;

        const builder = this.ctx(this.tableName);

        fields.forEach(key => {
            if (query[key]) {
                const value = query[key];
                if (value.indexOf('%') >= 0) {
                    builder.where(key, 'like', value);
                } else {
                    builder.where(key, value);
                }
            }
        });

        const calc = await builder.clone().count({ total: this.primaryKey }).first();
        meta.total = calc.total;

        if (meta.sortBy) {
            builder.limit(meta.limit).offset(meta.skip).orderBy(meta.sortBy, meta.sortDir);
        } else {
            builder.limit(meta.limit).offset(meta.skip);
        }

        const list = await builder.select(query.fields ? query.fields.split(',') : null);
        return { meta, list };
    }

    update(data, where) {
        return this.ctx(this.tableName).where(where).update(data);
    }
}

module.exports = Repo;
