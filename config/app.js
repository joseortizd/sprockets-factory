const express = require('express');
require('dotenv').config()
const helmet = require('helmet');
const routes = require('./routes');

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded());
routes.setRoutes(app);

module.exports = app;
