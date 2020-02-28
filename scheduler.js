require('dotenv').config();

const scraper = require("./src/helper/scraper");
const Product = require('./src/repositories/product');
const ProductPrice = require('./src/repositories/product_price');
const moment = require('moment');

async function update() {
    console.log("===Start Scheduler===");
    const product = new Product();
    const productPrice = new ProductPrice();
  
    const products = await product.getForUpdate();
    const urls = [...new Set(products.map((item) => item.url))];
  
    const scraping = await scraper(urls).catch(error => {
      errorHandler.unhandler(res, error);
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
    } catch (error) {
      console.log(error);
    }
  }

  update();