const { Repo } = require('../../libs');

class ProductImage extends Repo {
  constructor(option = {}) {
    const data = option;
    data.name = 'product_image';
    data.key = 'id';
    super(data);
  }
}

module.exports = ProductImage;
