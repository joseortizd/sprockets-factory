const express = require('express');
require('dotenv').config()
const helmet = require('helmet');
const routes = require('./routes');
const { ErrorHandler } = require("../src/application/middlewares/errorHandler.middleware");

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
routes.setRoutes(app);
app.use(ErrorHandler)

module.exports = app;
