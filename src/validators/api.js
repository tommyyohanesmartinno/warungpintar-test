const joi = require('joi');

const { validator } = require('./../../libs');

module.exports = {
  insertProduct: (req, res, next) => {
    const schema = {
        body: joi.object().keys({
            url: joi.string().required(),
        }).required()
    }
    validator.validate(req, res, next, schema);
  }
};
