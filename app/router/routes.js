const express = require('express')
const router = express.Router()
const logger = require('tracer').console()

const user_controller = require('./controllers/userController');
const meal_participants_controller = require('./controllers/mealParticipantsController.js');

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    logger.log(req.originalUrl, 'Time:', Date.now(), 'data:', JSON.stringify(req.body))
    next()
})

router.use('/info', require('./controllers/info.js'));
router.use('/studenthome', require('./studenthome.js'));

router.post('/register', user_controller.register);
router.post('/login', user_controller.login);

router.get('/:mealId/participants', meal_participants_controller.get_participants_get);
router.get('/:mealId/participants/:participantId', meal_participants_controller.get_participant_details_get);

module.exports = router