const joi = require('joi');

const { validator } = require('./../../libs');

module.exports = {
  insertProduct: (req, res, next) => {
    const schema = {
        body: joi.object().keys({
          title: joi.string().required(),
          description: joi.string().required(),
          rating: joi.string().required(),
          image: joi.string().required(),
        }).required()
    }
    validator.validate(req, res, next, schema);
  }
};
