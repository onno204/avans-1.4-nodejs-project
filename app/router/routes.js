const express = require('express')
const router = express.Router()
const logger = require('tracer').console()

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    logger.log(req.originalUrl, 'Time:', Date.now(), 'data:', JSON.stringify(req.body))
    next()
})

router.use('/info', require('./controllers/info.js'));
router.use('/studenthome', require('./studenthome.js'));
// router.use('/user', require('./controllers/users/routes.js'));

module.exports = router