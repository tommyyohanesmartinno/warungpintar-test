/* eslint-disable no-await-in-loop */
const joi = require('joi');

module.exports = {
    validate: async (req, res, next, schema = {}) => {
        try {
            const keys = Object.keys(schema);
            for (let i = 0; i < keys.length; i += 1) {
                const key = keys[i];
                req[key] = await joi.validate(req[key], schema[key]);
            }
            next();
        } catch (err) {
            res.status(400).send({ error_type: 'JOI_VALIDATOR_ERROR', message: err.details[0].message });
        }
    }
};
