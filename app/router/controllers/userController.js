const users_dao = require('./../../dao/users_dao');
const request_utils = require('./../../utils/requestUtils');
const logger = require('tracer').console()


exports.register = function (req, res) {
    logger.log("Received request to register user");
    return res.status(500).send({"success": false, "error": "not implemented yet"});
};

exports.login = function (req, res) {
    logger.log("Received request to log user in");
    return res.status(500).send({"success": false, "error": "not implemented yet"});
};
