const moment = require('moment');

exports.displayProduct = function displayProduct(data, url) {
    return {
        title: data.title,
        description: data.description,
        rating: data.rating,
        image: data.image,
        created_at: moment(data.created_at).local().format('DD-MM-YYYY HH:mm'),
        updated_at: moment(data.updated_at).local().format('DD-MM-YYYY HH:mm')
    };
};