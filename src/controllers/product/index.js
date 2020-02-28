const app = require('express').Router();
const { errorHandler } = require('../../../libs');
const validator = require('../../validators/api');
const Product = require('../../repositories/product');
const Transformer = require('../../transformers/product');

app.post('/', validator.insertProduct, async (req, res) => {
  const { body } = req;
  const product = new Product();

  const isExists = await product.findOne({ title: body.title });
  if(isExists) {
    errorHandler.badrequest(
      res,
      `Product already exist`
    );
    return;
  }

  try {
    const result = await product.insert(body);
    res.send({
        message: 'insert success',
        product_id: result.product_id[0]
    });
  } catch (err) {
    errorHandler.unhandler(res, err);
  }
});

app.get('/list', async (req, res) => {
  const { query } = req;

  const product = new Product();
  try {
    const listData = await product.list(query);
    res.send(listData);
  } catch (err) {
    errorHandler.unhandler(res, err);
  }
});

app.get('/detail/:id', async (req, res) => {
  const { params } = req;

  const product = new Product();

  const data = await product.findOne({ id: params.id });
  if(!data) {
    errorHandler.notFound(
      res,
      `Product didnt exist`
    );
    return;
  }

  try {
    res.send({
      message: 'success',
      product: Transformer.displayProduct(data)
  });
  } catch (err) {
    errorHandler.unhandler(res, err);
  }
});

app.delete('/delete/:id', async (req, res) => {
  const { params } = req;

  const product = new Product();

  const data = await product.findOne({ id: params.id });
  if(!data) {
    errorHandler.notFound(
      res,
      `Product didnt exist`
    );
    return;
  }

  try {
    await product.deleteOne({ id: params.id });

    res.send({
        message: 'delete success'
    });
  } catch (err) {
    errorHandler.unhandler(res, err);
  }
});

module.exports = app;
