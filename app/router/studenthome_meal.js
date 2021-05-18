const express = require('express')
const router = express.Router()
const logger = require('tracer').console()
const meal_controller = require('./controllers/mealController.js');
const meal_participants_controller = require('./controllers/mealParticipantsController.js');

router.post('/', meal_controller.create_post);
router.put('/:mealId', meal_controller.update_put);
router.get('/', meal_controller.get_all_get);
router.get('/:mealId', meal_controller.get_meal_details_get);
router.delete('/:mealId', meal_controller.delete);

router.post('/:mealId/signup', meal_participants_controller.signup_post);
router.put('/:mealId/signoff', meal_participants_controller.signoff_put);

module.exports = router