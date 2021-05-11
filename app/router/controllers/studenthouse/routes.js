const express = require('express')
const router = express.Router()
const logger = require('tracer').console()

router.use('/', require('./create.js'));
router.use('/list', require('./list.js'));
router.use('/details', require('./details.js'));
router.use('/update', require('./update.js'));
router.use('/delete', require('./delete.js'));

module.exports = router