const moment = require('moment');

exports.scraperToProduct = function scraperToProduct(data, url) {
    const resp = {
        name: data.title,
        url: url,
        description: data.description,
        price_regular: null,
        price_special: null,
        picture: data.picture
    };

    if (data.price.length == 1) {
        resp.price_regular = data.price[0].price;
    } else if (data.price.length > 1) {
        resp.price_regular = data.price[1].price;
        resp.price_special = data.price[0].price;
    }

    return resp;
};

exports.priceToChart = function priceToChart(data, length) {
    if (data.price_regular === null && length == 1) {
        data.price_regular = 0;
    }
    if (data.price_special === null) {
        data.price_special = 0;
    }
    return [
        moment(data.created_at).local().format('DD-MM-YYYY HH:mm'), data.price_regular, data.price_special
    ];
};