const express = require('express')
const router = express.Router()
const logger = require('tracer').console()
const studenthome_controller = require('./controllers/studenthomeController.js');

router.use('/meal', require('./studenthome_meal.js'));

router.post('/', studenthome_controller.house_create_post);
router.get('/', studenthome_controller.house_all_get);
router.get('/:homeId', studenthome_controller.house_details_get);
router.put('/:homeId', studenthome_controller.house_update_put);
router.delete('/:homeId', studenthome_controller.house_delete_delete);

module.exports = router