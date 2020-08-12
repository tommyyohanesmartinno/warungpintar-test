const app = require('express').Router();
const { errorHandler } = require('../../../libs');
const validator = require('../../validators/message');
const Message = require('../../repositories/message');
const Transformer = require('../../transformers/message');

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/send', validator.insert, async (req, res) => {
  const { body } = req;
  const message = new Message();
  try {
    const result = await message.insert(body);
    const data = Transformer.displayMessage(result);

    var io = req.app.get('io');
    io.emit('newMessage', data); 

    res.send({
      message: 'Success',
      data
    });
  } catch (err) {
    errorHandler.unhandler(res, err);
  }
});

app.get('/list', async (req, res) => {
  const message = new Message();
  try {
    const result = await message.findAll();
    res.send({
      message: 'Success',
      data: result.map(Transformer.displayMessage)
    });
  } catch (err) {
    errorHandler.unhandler(res, err);
  }
});

module.exports = app;
