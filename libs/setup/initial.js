/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const BASE_PATH = '../../..';

function setupMiddleware(app) {
    const baseRelPath = `${BASE_PATH}/src/middlewares`;
    const folderPath = path.join(__dirname, baseRelPath);

    if (fs.existsSync(folderPath)) {
        const files = fs.readdirSync(folderPath);
        files.forEach(fileName => {
            const filePath = path.join(folderPath, fileName);
            const stat = fs.statSync(filePath);

            if (stat.isFile() && fileName.endsWith('.js')) {
                require(filePath)(app);
            }
        });
    }
}

module.exports = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    app.use(cors({ credentials: true, origin: true }));

    setupMiddleware(app);
};
