const studenthouse_dao = require('./../../dao/studenthouse_dao');
const request_utils = require('./../../utils/requestUtils');
const logger = require('tracer').console()


exports.house_create_post = function (req, res) {
    logger.log("Received request to create a studenthome");
    let check = request_utils.verifyBody(req, res, 'name', 'string');
    check = check && request_utils.verifyBody(req, res, 'street', 'string');
    check = check && request_utils.verifyBody(req, res, 'housenumber', 'int');
    check = check && request_utils.verifyBody(req, res, 'postalcode', 'string');
    check = check && request_utils.verifyBody(req, res, 'city', 'string');
    check = check && request_utils.verifyBody(req, res, 'phonenumber', 'string');
    if (!check) {
        logger.log("Request cancelled because of an invalid param");
        return;
    }

    studenthouse_dao.add({
        name: req.body.name,
        street: req.body.street,
        housenumber: req.body.housenumber,
        postalcode: req.body.postalcode,
        city: req.body.city,
        phonenumber: req.body.phonenumber,
        user_id: req.user_id
    }, (err2, res2) => {
        if (err2) {
            logger.log("Error in creation:", err2);
            return res.status(400).send({"success": false, "error": err2});
        }
        logger.log("Studenthouse created with id", res2);
        return res.status(201).send({"success": true, "id": res2});
    })
};

exports.house_all_get = function (req, res) {
    logger.log("Received request to get all studenthouses");
    studenthouse_dao.getAll((err, res2) => {
        if (err) {
            logger.log("Error in listing:", err);
            return res.status(400).send({"success": false, "error": err});
        }
        logger.log("Returning houses list:", res2);
        return res.status(200).send({"success": true, "houses": res2});
    })
};

exports.house_details_get = function (req, res) {
    logger.log("Received request for house details");
    let check = request_utils.verifyParam(req, res, 'homeId', 'string');
    if (!check) {
        logger.log("Request cancelled because of an invalid param");
        return;
    }

    studenthouse_dao.get(req.params.homeId, (err, res2) => {
        if (err) {
            logger.log("Error in details:", err);
            return res.status(400).send({"success": false, "error": err});
        }
        logger.log("Returning house details:", res2);
        return res.status(200).send({"success": true, "house": res2});
    });
};

exports.house_update_put = function (req, res) {
    logger.log("Received request to update a student house");
    let check = request_utils.verifyBody(req, res, 'name', 'string');
    check = check && request_utils.verifyBody(req, res, 'street', 'string');
    check = check && request_utils.verifyBody(req, res, 'housenumber', 'int');
    check = check && request_utils.verifyBody(req, res, 'postalcode', 'string');
    check = check && request_utils.verifyBody(req, res, 'city', 'string');
    check = check && request_utils.verifyBody(req, res, 'phonenumber', 'string');
    check = check && request_utils.verifyParam(req, res, 'homeId', 'string');
    if (!check) {
        logger.log("Request cancelled because of an invalid param");
        return;
    }

    logger.log("Studenthouse update with id", req.params.homeId);
    studenthouse_dao.checkIfUserIsAdmin(req.params.homeId, req.user_id, (err, user_verified) => {
        if (err) {
            logger.log("Error in update:", err);
            return res.status(401).send({"success": false, "error": err});
        }
        studenthouse_dao.update(req.params.homeId, {
            id: req.params.homeId,
            name: req.body.name,
            street: req.body.street,
            housenumber: req.body.housenumber,
            postalcode: req.body.postalcode,
            city: req.body.city,
            phonenumber: req.body.phonenumber,
        }, (err, res2) => {
            if (err) {
                logger.log("Error in update:", err);
                return res.status(400).send({"success": false, "error": err});
            }
            logger.log("Update house successfully");
            return res.status(202).send({"success": true, "house": res2});
        });
    });
};

exports.house_delete_delete = function (req, res) {
    logger.log("Received request to delete a user house");
    let check = request_utils.verifyParam(req, res, 'homeId', 'string');
    if (!check) {
        logger.log("Request cancelled because of an invalid param");
        return;
    }
    studenthouse_dao.checkIfUserIsAdmin(req.params.homeId, req.user_id, (err, user_verified) => {
        if (err) {
            logger.log("Error in update:", err);
            return res.status(401).send({"success": false, "error": err});
        }
        studenthouse_dao.remove(req.params.homeId, (err, res2) => {
            if (err) {
                logger.log("Error in removing:", err);
                return res.status(400).send({"success": false, "error": err});
            }
            logger.log("House removed");
            return res.status(202).send({"success": true, "id": res2});
        });
    });
};
