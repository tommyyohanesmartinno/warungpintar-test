const http = require('http');
const express = require('express');
const socketIO = require('socket.io'); 
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const core = require('./libs');

const { routing } = core.setup;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000
  })
);
app.use(cors({ credentials: true, origin: true }));
app.use(morgan('tiny'));

routing(app);

const server = http.createServer(app);
let io = socketIO(server);

module.exports = { app, server, io };
