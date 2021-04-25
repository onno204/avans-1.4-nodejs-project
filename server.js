const port = process.env.PORT || 3000;
const express = require('express');
const app = express();
const router = express.Router();

router.get('/sysinfo', (req, res) => {
    res.set('Content-Type', 'application/json');
    res.send(JSON.stringify({
        "developer": "onno204",
        "student_number": "2167988",
        "description": "School project",
    }));
});


const studenthouse_router = express.Router();
studenthouse_router.get('/info', (req, res) => {
    res.set('Content-Type', 'application/json');
    res.send(JSON.stringify({
        "developer": "onno204",
        "student_number": "2167988",
        "description": "School project",
    }));
});

router.use('/student_house', studenthouse_router);
app.use('/api/v1', router);
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});