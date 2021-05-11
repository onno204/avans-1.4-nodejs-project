const express = require('express')
const router = express.Router()
const logger = require('tracer').console()

router.use('/register', require('./register.js'));
router.use('/list', require('./list.js'));

module.exports = router