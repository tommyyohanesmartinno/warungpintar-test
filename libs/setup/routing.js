/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const express = require('express');
const path = require('path');
const fs = require('fs');

const BASE_PATH = process.env.APP_BASE_PATH || '../../';

function setupController(app) {
    const routes = [];

    function routingApi(option) {
        const { folderPath, folder = '' } = option;
        let { prefix } = option;

        if (fs.existsSync(folderPath)) {
            if (prefix && prefix.substr(0, 1) !== '/') {
                prefix = `/${prefix}`;
            }

            const files = fs.readdirSync(folderPath).reverse();
            files.forEach((fileName) => {
                const filePath = path.join(folderPath, fileName);
                const stat = fs.statSync(filePath);

                if (stat.isFile()) {
                    if (fileName.split('.')[1] === 'js') {
                        const name = fileName.toLowerCase().substr(0, fileName.length - 3);
                        const controllerName = folderPath.split('\controllers')[1].replace('\\', '');
                        const route = `${controllerName}/${name}`;
                        routes.push(route);
                    }
                } else if (stat.isDirectory()) {
                    routingApi({ folderPath: filePath, folder: fileName, prefix });
                }
            });
        }
    }

    const basePath = path.join(__dirname, BASE_PATH, 'src/controllers');
    const apiPrefix = process.env.APP_API_PREFIX || '';
    routingApi({ folderPath: basePath, prefix: apiPrefix });

    routes.forEach(m => {
        let route = m.split('_').join('-');
        const ends = ['/index', '/_index'];

        ends.forEach(n => {
            if (m.endsWith(n)) {
                route = route.substr(0, m.length - n.length);
            }
        });

        route = `${apiPrefix}${route}`;
        if (m.charAt(0) === '/') {
            m = m.substr(1, m.length);
        }
        if (route.charAt(0) === '/') {
            route = route.substr(1, route.length);
        }
        app.use(`/${route}`, require(`./../../src/controllers/${m}`));
    });
    // app.use('/user', require('./../../src/controllers/user/index'));
    // app.use('/test', require('./../../src/controllers/test/index.js'));

    app.get(`${apiPrefix}/auth/route/list`, (req, res) => res.send(routes));
}

function setupRoute(app) {
    const basePath = path.join(__dirname, BASE_PATH, 'src/routes');
    const filePath = path.join(basePath, 'index.js');

    if (fs.existsSync(filePath)) {
        require(basePath)(app);
    }
}

module.exports = (app) => {
    setupController(app);
    setupRoute(app);
};
