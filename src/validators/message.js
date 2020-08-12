const joi = require('joi');

const { validator } = require('./../../libs');

module.exports = {
  insert: (req, res, next) => {
    const schema = {
        body: joi.object().keys({
          content: joi.string().required()
        }).required()
    }
    validator.validate(req, res, next, schema);
  }
};
