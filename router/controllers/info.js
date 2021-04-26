const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.set('Content-Type', 'application/json');
    res.send(JSON.stringify({
        "developer": "onno204",
        "student_number": "2167988",
        "description": "School project",
    }));
});

module.exports = router

