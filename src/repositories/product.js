const { Repo } = require('./../../libs');

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
        title: values.title,
        description: values.description,
        rating: values.rating,
        image: values.image,
      },
      ['id']
    );
    return {
      message: 'success',
      product_id
    };
  }


  async deleteOne(where) {
    return this.ctx(this.tableName).where(where).del();
  }
}

module.exports = Product;
