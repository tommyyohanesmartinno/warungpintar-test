const http = require('http');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const core = require('./libs');

const { routing, sockets } = core.setup;

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
const io = sockets.listen(server);
app.set('io', io);

module.exports = { app, server };
