const express = require('express')
const router = express.Router()

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    console.log(req.originalUrl, 'Time:', Date.now())
    next()
})

router.use('/info', require('./controllers/info.js'));

module.exports = router