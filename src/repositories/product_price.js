const { Repo } = require('../../libs');

class ProductPrice extends Repo {
  constructor(option = {}) {
    const data = option;
    data.name = 'product_price';
    data.key = 'id';
    super(data);
  }

  async insert(values) {
    await this.ctx(this.tableName).insert(
      { 
        product_id: values.product_id,
        price_regular: values.price_regular,
        price_special: values.price_special,
      });

    return {
      message: 'success'
    };
  }
}

module.exports = ProductPrice;
