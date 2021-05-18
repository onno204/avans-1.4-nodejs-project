const meals_dao = require('./../../dao/meals_dao');
const request_utils = require('./../../utils/requestUtils');
const logger = require('tracer').console()


exports.create_post = function (req, res) {
    logger.log("Received request to create meal");
    return res.status(500).send({"success": false, "error": "not implemented yet"});
};

exports.update_put = function (req, res) {
    logger.log("Received request to update meal");
    return res.status(500).send({"success": false, "error": "not implemented yet"});
};

exports.delete = function (req, res) {
    logger.log("Received request to delete meal");
    return res.status(500).send({"success": false, "error": "not implemented yet"});
};

exports.get_all_get = function (req, res) {
    logger.log("Received request to get all meals");
    return res.status(500).send({"success": false, "error": "not implemented yet"});
};

exports.get_meal_details_get = function (req, res) {
    logger.log("Received request to get details about a meal");
    return res.status(500).send({"success": false, "error": "not implemented yet"});
};