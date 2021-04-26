const port = process.env.PORT || 3000;
const express = require('express');
const app = express();
const router = express.Router();
const routes = require('./router/routes')

app.use('/api/v1', routes);
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});