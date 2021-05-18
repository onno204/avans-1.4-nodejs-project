const users_dao = require('./../../dao/users_dao');
const request_utils = require('./../../utils/requestUtils');
const logger = require('tracer').console()


exports.register = function (req, res) {
    logger.log("Received request to register user");
    let check = request_utils.verifyBody(req, res, 'firstname', 'string');
    check = check && request_utils.verifyBody(req, res, 'lastname', 'string');
    check = check && request_utils.verifyBody(req, res, 'studentnumber', 'int');
    check = check && request_utils.verifyBody(req, res, 'email_address', 'string');
    check = check && request_utils.verifyBody(req, res, 'password', 'string');
    if (!check) {
        logger.log("Request cancelled because of an invalid param");
        return;
    }

    users_dao.add({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        studentnumber: req.body.studentnumber,
        email_address: req.body.email_address,
        password: req.body.password
    }, (err2, res2) => {
        if (err2) {
            logger.log("Error in register:", err2);
            return res.status(400).send({"success": false, "error": err2});
        }
        logger.log("User created with token", res2);
        return res.status(201).send({"success": true, "token": res2});
    })
};

exports.login = function (req, res) {
    logger.log("Received request to log user in");
    let check = request_utils.verifyBody(req, res, 'email_address', 'string');
    check = check && request_utils.verifyBody(req, res, 'password', 'string');
    if (!check) {
        logger.log("Request cancelled because of an invalid param");
        return;
    }

    users_dao.login(req.body.email_address, req.body.password, (err2, res2) => {
        if (err2) {
            logger.log("Error in login:", err2);
            return res.status(400).send({"success": false, "error": err2});
        }
        logger.log("User logged in with token", res2);
        return res.status(201).send({"success": true, "token": res2});
    })
};
