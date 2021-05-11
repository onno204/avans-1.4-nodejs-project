const express = require('express')
const router = express.Router()
const logger = require('tracer').console()
const user_dao = require('../../../dao/users_dao')

router.post('/', (req, res) => {
    logger.log("User registered");
    const token =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    user_dao.add({
        name: req.body.name,
        token: token
    })
    res.send(JSON.stringify({"success": true, "token": token}));
});

module.exports = router

