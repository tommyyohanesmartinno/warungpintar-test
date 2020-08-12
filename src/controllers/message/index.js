const app = require('express').Router();
const { errorHandler } = require('../../../libs');
const validator = require('../../validators/message');
const Message = require('../../repositories/message');
const Transformer = require('../../transformers/message');

app.post('/', validator.insert, async (req, res) => {
  const { body } = req;
  const message = new Message();
  try {
    const result = await message.insert(body);

    // io.on('connection', (socket) => { 
    //    socket.emit('newMessage', Transformer.displayMessage(result)); 
    // });

    res.send({
      message: 'Success',
      data: Transformer.displayMessage(result)
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
