const express = require('express')
const router = express.Router()
const logger = require('tracer').console()
const studenthouse_dao = require('../../../dao/studenthouse_dao')

router.post('/', (req, res) => {
    logger.log("Studenthouse created");
    const token =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    studenthouse_dao.add({
        name: req.body.name,
        token: token
    })
    res.send(JSON.stringify({"success": true, "token": token}));
});

module.exports = router

