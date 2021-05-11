
const studenthouse_dao = require('./../../dao/studenthouse_dao');
const logger = require('tracer').console()


exports.house_create_post = function(req, res) {
    logger.log("Creating student house");
    const body = req.body;
    if (typeof body.name !== 'string') {
        logger.log("Studenthouse Creation failed at name");
        return res.status(400).send('Missing param: name');
    }
    if (typeof body.street !== 'string') {
        logger.log("Studenthouse Creation failed at street");
        return res.status(400).send('Missing param: street');
    }
    body.housenumber = parseInt(body.housenumber);
    if (isNaN(body.housenumber)) {
        logger.log("Studenthouse Creation failed at housenumber");
        return res.status(400).send('Missing param: housenumber');
    }
    if (typeof body.postalcode !== 'string') {
        logger.log("Studenthouse Creation failed at postalcode");
        return res.status(400).send('Missing param: postalcode');
    }
    if (typeof body.city !== 'string') {
        logger.log("Studenthouse Creation failed at city");
        return res.status(400).send('Missing param: city');
    }
    if (typeof body.phonenumber !== 'string') {
        logger.log("Studenthouse Creation failed at phonenumber");
        return res.status(400).send('Missing param: phonenumber');
    }

    const token =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    studenthouse_dao.add({
        id: token,
        name: body.name,
        street: body.street,
        housenumber: body.housenumber,
        postalcode: body.postalcode,
        city: body.city,
        phonenumber: body.phonenumber,
    })
    logger.log("Studenthouse created with id", token);
    return res.status(201).send({"success": true, "id": token});
};

exports.house_all_get = function(req, res) {
    logger.log("Requesting student houses");
    studenthouse_dao.getAll((err, res2) => {
        if (err) {
            logger.log("Error in listing:", err);
            return res.status(400).send({"success": false, "error": err});
        }
        logger.log("Returning houses list:", res2);
        return res.status(200).send({"success": true, "houses": res2});
    })
};

exports.house_details_get = function(req, res) {
    logger.log("Requesting studenthouse details");
    const params = req.params;
    if (typeof params.homeId !== 'string') {
        logger.log("Studenthouse request failed at homeId");
        return res.status(400).send('Missing URL param: homeId');
    }
    studenthouse_dao.get(params.homeId, (err, res2) => {
        if (err) {
            logger.log("Error in details:", err);
            return res.status(400).send({"success": false, "error": err});
        }
        logger.log("Returning house details:", res2);
        return res.status(200).send({"success": true, "house": res2});
    })
};

exports.house_update_put = function(req, res) {
    logger.log("Updating student house");
    const params = req.params;
    if (typeof params.homeId !== 'string') {
        logger.log("Studenthouse request failed at homeId");
        return res.status(400).send('Missing URL param: homeId');
    }
    const body = req.body;
    if (typeof body.name !== 'string') {
        logger.log("Studenthouse Update failed at name");
        return res.status(400).send('Missing param: name');
    }
    if (typeof body.street !== 'string') {
        logger.log("Studenthouse Update failed at street");
        return res.status(400).send('Missing param: street');
    }
    body.housenumber = parseInt(body.housenumber);
    if (isNaN(body.housenumber)) {
        logger.log("Studenthouse Update failed at housenumber");
        return res.status(400).send('Missing param: housenumber');
    }
    if (typeof body.postalcode !== 'string') {
        logger.log("Studenthouse Update failed at postalcode");
        return res.status(400).send('Missing param: postalcode');
    }
    if (typeof body.city !== 'string') {
        logger.log("Studenthouse Update failed at city");
        return res.status(400).send('Missing param: city');
    }
    if (typeof body.phonenumber !== 'string') {
        logger.log("Studenthouse Update failed at phonenumber");
        return res.status(400).send('Missing param: phonenumber');
    }

    logger.log("Studenthouse update with id", params.homeId);
    studenthouse_dao.update(params.homeId, {
        id: params.homeId,
        name: body.name,
        street: body.street,
        housenumber: body.housenumber,
        postalcode: body.postalcode,
        city: body.city,
        phonenumber: body.phonenumber,
    }, (err, res2) => {
        if (err) {
            logger.log("Error in update:", err);
            return res.status(400).send({"success": false, "error": err});
        }
        logger.log("Returning updated house:", res2);
        return res.status(202).send({"success": true, "house": res2});
    })
};

exports.house_delete_delete = function(req, res) {
    logger.log("Requesting deletion of studenthouse");
    const params = req.params;
    if (typeof params.homeId !== 'string') {
        logger.log("Studenthouse delete request failed at homeId");
        return res.status(400).send('Missing URL param: homeId');
    }
    studenthouse_dao.remove(params.homeId, (err, res2) => {
        if (err) {
            logger.log("Error in removing:", err);
            return res.status(400).send({"success": false, "error": err});
        }
        logger.log("Returning removed house id:", res2);
        return res.status(202).send({"success": true, "id": res2});
    })
};
