/* eslint-disable object-curly-newline */
module.exports = {
    unhandler: (res, error) => {
        res.status(500).send(error);
    },
    badrequest: (res, message) => {
        res.status(400).send({ message });
    },
    notFound: (res, message) => {
        res.status(404).send({ message });
    },
    unprocessableEntity: (res, code, message) => {
        res.status(422).send({ code, message });
    }
};
