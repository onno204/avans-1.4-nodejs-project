const express = require('express')
const router = express.Router()
const logger = require('tracer').console()

router.get('/', (req, res) => {
    logger.log("Returning static server info");
    res.set('Content-Type', 'application/json');
    res.send(JSON.stringify({
        "developer": "onno204",
        "student_number": "2167988",
        "description": "School project",
    }));
});

module.exports = router

