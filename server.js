const http = require('http');
const express = require('express');
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

routing(app);

const server = http.createServer(app);

module.exports = { app, server };
