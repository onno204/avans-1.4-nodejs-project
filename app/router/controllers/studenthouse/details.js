const express = require('express')
const router = express.Router()
const logger = require('tracer').console()
const studenthouse_dao = require('../../../dao/studenthouse_dao')

router.post('/', (req, res) => {
    res.set('Content-Type', 'application/json');
    logger.log("TODO");
    res.send(JSON.stringify({"TODO": true}));
});

module.exports = router

