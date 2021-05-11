const express = require('express')
const router = express.Router()
const logger = require('tracer').console()
const user_dao = require('../../../dao/users_dao')

router.get('/', (req, res) => {
    logger.log("users listed");
    user_dao.getAll((err, res2) => {
        res.send(JSON.stringify({"success": true, "data": res2}));
    })
});

module.exports = router

