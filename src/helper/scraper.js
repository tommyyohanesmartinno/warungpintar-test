const puppeteer = require("puppeteer");
const cheerio = require('cheerio');
const transformer = require('../transformers/product');

function strip_html_tags(str)
{
   if ((str===null) || (str===''))
       return false;
  else
   str = str.toString();
  return str.replace(/<[^>]*>/g, '').replace(/&#xA0;/g, ' ');
}

const scraper = async urls => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"]
  });
  const page = await browser.newPage();
  let dataObj = [];

  try {
    for (let i = 0; i < urls.length; i++) {
      let data =  {
        name: '',
        description: '',
        price: [],
        picture: []
      };

      const promise = page.waitForNavigation({ waitUntil: 'networkidle2' });
      await page.goto(`${urls[i]}`);
      await promise;
      await page.waitForSelector('.fotorama__loaded--img');
      // await page.waitFor(2000);
      const htmlDOM = await page.evaluate(() => {
        return document.querySelector('main').innerHTML;
      });
      
      const $ = cheerio.load(htmlDOM);
      data.title = $('h1.page-title').attr('title');
      data.description = strip_html_tags($('div#description').html());
      $('div.product-info-main').find('div.price-box').find('span.price-container').each((i, elem) => {
        data.price.push({
          title: $(elem).find('span.price-label').html(),
          price: $(elem).find('span.price-wrapper').attr('data-price-amount')
        });
      });
      $('div.fotorama__stage').find('img.fotorama__img').each((i, elem) => {
        data.picture.push($(elem).attr('src'));
      });

      dataObj.push(transformer.scraperToProduct(data, urls[i]));
    }
  } catch (error) {
    throw error;
  }

  browser.close();
  return dataObj;
};

module.exports = scraper;