const { Repo } = require('./../../libs');
const moment = require('moment');

class Product extends Repo {
  constructor(option = {}) {
    const data = option;
    data.name = 'product';
    data.key = 'id';
    super(data);
  }

  async insert(values) {
    const product_id = await this.ctx(this.tableName).insert(
      { 
        name: values.name,
        url: values.url,
        description: values.description,
        price_regular: values.price_regular,
        price_special: values.price_special,
      },
      ['id']
    );
    values.picture.forEach(async item => {
      await this.ctx('product_image').insert({
        product_id,
        image: item
      });
    });

    return {
      message: 'success',
      product_id
    };
  }

  async getForUpdate() {
    return this.ctx(this.tableName)
      .whereRaw('HOUR(TIMEDIFF(NOW(), updated_at)) >= 1')
      .select()
      .orderBy('updated_at', 'ASC');
  }
}

module.exports = Product;
