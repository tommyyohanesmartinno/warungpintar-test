const moment = require('moment');

exports.displayMessage = function displayMessage(data) {
    return {
        content: data.content,
        created_at: moment(data.createdAt).local().format('DD-MM-YYYY HH:mm')
    };
};