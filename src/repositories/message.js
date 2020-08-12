const moment = require('moment');

const filename = './src/data/posts.json';
let posts = require('../../src/data/posts.json');
const helper = require('../../src/helpers/helper.js');

class Message {
  insertSingle(data) {
    const message = { 
      id: helper.getNewId(posts),
      content: data.content,
      createdAt: moment().local()
    };

    posts.push(message);
    helper.writeJSONFile(filename, posts);

    return message;
  }

  getAll() {
    if (posts.length === 0) {
      posts = [];
    }

    return posts;
  }

  async insert(data) {
    const result = await this.insertSingle(data);
    return result;
  }

  async findAll() {
    const result = await this.getAll();
    return result;
  }
}

module.exports = Message;
