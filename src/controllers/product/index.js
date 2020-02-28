const app = require('express').Router();
const { errorHandler } = require('../../../libs');
const validator = require('../../validators/api');
const scraper = require("./../../helper/scraper");
const Product = require('../../repositories/product');
const ProductImage = require('../../repositories/product_image');
const ProductPrice = require('../../repositories/product_price');
const transformers = require('../../transformers/product');
const moment = require('moment');

app.post('/', validator.insertProduct, async (req, res) => {
  const { body } = req;
  const product = new Product();
  const productPrice = new ProductPrice();

  const isExists = await product.findOne({ url: body.url });
  if(isExists) {
    errorHandler.badrequest(
      res,
      `Product already exist`
    );
    return;
  }

  const scraping = await scraper([body.url]).catch(error => {
    errorHandler.unhandler(res, error);
    return;
  });

  try {
    const result = await product.insert(scraping[0]);
    await productPrice.insert({
      product_id: result.product_id[0],
      price_regular: scraping[0].price_regular,
      price_special: scraping[0].price_special
    });

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
  const productImage = new ProductImage();
  const productPrice = new ProductPrice();

  const data = await product.findOne({ id: params.id });
  if(!data) {
    errorHandler.notFound(
      res,
      `Product didnt exist`
    );
    return;
  }

  try {
    let price = await productPrice.findAll({ product_id: params.id });
    const picture = await productImage.findAll({ product_id: params.id });
    price = price.map(x => transformers.priceToChart(x, price.length));
    dataChart = [
      ["Time", "Regular Price", "Special Price"],
    ];

    res.send({
      message: 'success',
      product: data,
      price: dataChart.concat(price),
      picture
  });
  } catch (err) {
    errorHandler.unhandler(res, err);
  }
});

app.post('/update', async (req, res) => {
  const product = new Product();
  const productPrice = new ProductPrice();

  const products = await product.getForUpdate();
  const urls = [...new Set(products.map((item) => item.url))];

  const scraping = await scraper(urls).catch(error => {
    errorHandler.unhandler(res, error);
    return;
  });

  try {
    await Promise.all(scraping.map(async (item) => {
      var picked = products.find(o => o.url === item.url);
      await product.update(
        {
          price_regular: item.price_regular,
          price_special: item.price_special,
          updated_at: moment().utc().format('YYYY-MM-DD HH:mm:ss')
        }, { id: picked.id});

      await productPrice.insert({
        product_id: picked.id,
        price_regular: item.price_regular,
        price_special: item.price_special
      });
    }));

    res.send({
        message: 'update success'
    });
  } catch (err) {
    errorHandler.unhandler(res, err);
  }
});

module.exports = app;
