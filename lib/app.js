const express = require('express');
const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error');
const animalsController = require('../lib/controllers/animalsController');

const app = express();

app.use(express.json());

app.use('/api/animals', animalsController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;
