/* eslint-disable object-curly-newline */
module.exports = {
    unhandler: (res, error) => {
        if (typeof error === 'string') {
            res.status(500).send({ message: error });
        } else {
            const { code, sqlMessage: sql } = error;
            let { message } = error;
            if (typeof sql !== 'undefined') {
                message = sql;
            }
            res.status(500).send({ code, message });
        }
    },
    badrequest: (res, message) => {
        res.status(400).send({ message });
    },
    conflict: (res, message) => {
        res.status(409).send({ message });
    },
    notFound: (res, message) => {
        res.status(404).send({ message });
    },
    unprocessableEntity: (res, code, message) => {
        res.status(422).send({ code, message });
    }
};
