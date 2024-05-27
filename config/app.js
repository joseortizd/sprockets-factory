const express = require('express');
const helmet = require('helmet');
const routes = require('./routes');

const app = express();

app.use(helmet());
routes.setRoutes(app);

module.exports = app;
