const port = process.env.PORT || 3000;
const express = require('express');
const app = express();
const routes = require('./router/routes')
const logger = require('tracer').console()
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1', routes);
app.listen(port, () => {
    logger.log(`Avans app listening at http://localhost:${port}`);
});