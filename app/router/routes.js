const express = require('express');
const router = express.Router();
const config = require('./../config');
const jwt = require('jsonwebtoken');
const logger = require('tracer').console()

const user_controller = require('./controllers/userController');
const meal_participants_controller = require('./controllers/mealParticipantsController.js');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    logger.log(req.originalUrl, 'Time:', Date.now(), 'data:', JSON.stringify(req.body))
    next()
});

router.use(function timeLog(req, res, next) {
    if (req._parsedUrl.path === "/info" || req._parsedUrl.path === "/register" || req._parsedUrl.path === "/login") {
        return next();
    }
    logger.log("User authentication started");
    const token = (req.header("authorization") ?? "").replace('Bearer ', '');
    console.log("token: ", token);

    jwt.verify(token, config.auth.secret, {}, function (err, decoded) {
        if (err) return res.status(401).send({"success": false, "error": "Unauthorized"});
        req.user_email = decoded.user_email;
        req.user_id = decoded.user_id;
        logger.log("User success:", decoded);
        next();
    });
});

router.use('/info', require('./controllers/info.js'));
router.use('/studenthome', require('./studenthome.js'));

router.post('/register', user_controller.register);
router.post('/login', user_controller.login);

router.get('/:mealId/participants', meal_participants_controller.get_participants_get);
router.get('/:mealId/participants/:participantId', meal_participants_controller.get_participant_details_get);

module.exports = router