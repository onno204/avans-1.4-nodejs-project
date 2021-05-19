const logger = require('tracer').console()


exports.verifyParam = function (req, res, paramName, paramType) {
    const success = exports.verifyValue(req.params[paramName], paramType);
    if (!success) {
        logger.log("Param", paramName, "was missing or not of type", paramType);
        res.status(400).send({"success": false, "error": "Missing param " + paramName + " or not of type " + paramType});
        return false;
    }
    return true;
}

exports.verifyBody = function (req, res, paramName, paramType) {
    const success = exports.verifyValue(req.body[paramName], paramType);
    if (!success) {
        logger.log("Body", paramName, "was missing or not of type", paramType);
        res.status(400).send({"success": false, "error": "Missing param " + paramName + " or not of type " + paramType});
        return false;
    }
    return true;
}

exports.verifyValue = function (value, type) {
    let success = false;
    switch (type) {
        case 'int':
            value = parseInt(value);
            success = !isNaN(value);
            break;
        default:
            success = typeof value === type;
            break;
    }
    return success;
}